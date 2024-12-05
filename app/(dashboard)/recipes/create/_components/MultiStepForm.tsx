'use client'

import { CreateRecipe } from '@/actions/recipes/createRecipe'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import {
  createRecipeSchema,
  createRecipeSchemaMultiStep,
  createRecipeSchemaType,
  updateRecipeSchemaType,
} from '@/schema/recipe'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import BasicInfo from './BasicInfo'
import CuisineInfo from './CuisineInfo'
import IngredientInfo from './IngredientInfo'
import InstructionInfo from './InstructionInfo'
import StepperIndicator from './StepperIndicator'
import SummaryInfo from './SummaryInfo'
import { UpdateRecipe } from '@/actions/recipes/updateRecipe'

const steps = ['Basic', 'Cuisines', 'Ingredients', 'Instructions', 'Review']

export default function MultiStepForm({
  initialData,
  action,
  recipeId,
}: {
  initialData?: updateRecipeSchemaType
  action: 'create' | 'edit'
  recipeId?: string
}) {
  const [activeStep, setActiveStep] = useState(0)

  const currentValidationSchema =
    createRecipeSchemaMultiStep[activeStep] || createRecipeSchema

  const defaultValues = initialData || {
    title: '',
    cuisines: [],
    ingredients: [
      {
        name: '',
        amount: 0,
        unit: '',
      },
    ],
    instructions: [
      {
        description: '',
        cookTime: 0,
      },
    ],
  }

  const form = useForm<createRecipeSchemaType>({
    resolver: zodResolver(currentValidationSchema),
    defaultValues,
  })

  const currentStep = () => {
    switch (activeStep) {
      case 0:
        return <BasicInfo />
      case 1:
        return <CuisineInfo />
      case 2:
        return <IngredientInfo />
      case 3:
        return <InstructionInfo />
      case 4:
        return <SummaryInfo />
      default:
        return null
    }
  }

  const mutation = useMutation({
    mutationFn: CreateRecipe,
    onSuccess: () => {
      toast.success('Recipe created successfully', { id: 'create-recipe' })
      form.reset()
    },
    onError: () => {
      toast.error('Something went wrong', { id: 'create-recipe' })
    },
  })

  const editMutation = useMutation({
    mutationFn: UpdateRecipe,
    onSuccess: () => {
      toast.success('Recipe updated successfully', { id: 'edit-recipe' })
      form.reset()
    },
    onError: () => {
      toast.error('Something went wrong', { id: 'edit-recipe' })
    },
  })

  const handleNext = async () => {
    const isStepValid = await form.trigger(undefined, { shouldFocus: true })
    if (isStepValid) {
      setActiveStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prev) => prev - 1)
  }

  const onSubmit = useCallback(
    (values: createRecipeSchemaType) => {
      if (action === 'create') {
        toast.loading('Creating recipe...', { id: 'create-recipe' })
        mutation.mutate(values)
      }
      if (action === 'edit') {
        toast.loading('Updating recipe...', { id: 'edit-recipe' })
        editMutation.mutate({
          id: recipeId,
          status: initialData?.status,
          ...values,
        })
      }
    },
    [action, mutation, editMutation, recipeId, initialData?.status]
  )

  return (
    <div>
      <StepperIndicator activeStep={activeStep} steps={steps} />
      <Form {...form}>
        <form className="w-full">
          <div className="p-4 mt-10 flex flex-col gap-6">{currentStep()}</div>
          <div className="flex items-center gap-4 justify-center py-4">
            <Button
              type="button"
              variant={'secondary'}
              disabled={activeStep === 0}
              className="min-w-[100px]"
              onClick={handleBack}
            >
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                type="button"
                onClick={form.handleSubmit(onSubmit)}
                className="min-w-[100px]"
              >
                Submit
              </Button>
            ) : (
              <Button
                type="button"
                className="min-w-[100px]"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}
