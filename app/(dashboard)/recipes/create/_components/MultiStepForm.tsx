'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import {
  createRecipeSchema,
  createRecipeSchemaMultiStep,
  createRecipeSchemaType,
} from '@/schema/recipe'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import BasicInfo from './BasicInfo'
import StepperIndicator from './StepperIndicator'
import CuisineInfo from './CuisineInfo'
import IngredientInfo from './IngredientInfo'

export default function MultiStepForm() {
  const [activeStep, setActiveStep] = useState(0)
  const currentValidationSchema = createRecipeSchemaMultiStep[activeStep]

  const form = useForm<createRecipeSchemaType>({
    resolver: zodResolver(currentValidationSchema),
    defaultValues: {
      ingredients: [{ id: '', amount: undefined, unit: '' }],
      cuisines: [],
    },
  })

  const steps = [
    {
      name: 'Basic',
      component: <BasicInfo />,
    },
    {
      name: 'Cuisines',
      component: <CuisineInfo />,
    },
    {
      name: 'Ingredients',
      component: <IngredientInfo />,
    },
    {
      name: 'Instructions',
      component: <div>Instructions</div>,
    },
    {
      name: 'Summary',
      component: <div>Summary</div>,
    },
  ]

  const handleNext = async () => {
    const isStepValid = await form.trigger(undefined, { shouldFocus: true })
    if (isStepValid) {
      setActiveStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prev) => prev - 1)
  }

  const onSubmit = useCallback((values: createRecipeSchemaType) => {
    console.log('🚀 ~ MultiStepForm ~ values:', values)
    // toast.loading('Creating recipe...', { id: 'create-recipe' })
  }, [])

  return (
    <div>
      <StepperIndicator
        activeStep={activeStep}
        steps={steps.map((step) => step.name)}
      />
      <Form {...form}>
        <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="p-4 mt-10 flex flex-col gap-6">
            {steps[activeStep].component}
          </div>
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
              <Button type="submit" className="min-w-[100px]">
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
