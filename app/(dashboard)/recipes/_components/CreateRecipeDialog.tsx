'use client'
import { CreateRecipe } from '@/actions/recipes/createRecipe'
import CustomDialogHeader from '@/components/CustomDialogHeader'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createRecipeSchema, createRecipeSchemaType } from '@/schema/recipe'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { ChefHat, Loader2Icon } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import CreateIngredientForm from './CreateIngredientForm'
import SelectCuisine from './SelectCuisine'

export default function CreateRecipeDialog({
  triggerText,
}: {
  triggerText?: string
}) {
  const [open, setOpen] = useState(false)

  const form = useForm<createRecipeSchemaType>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      ingredients: [],
    },
  })

  const mutation = useMutation({
    mutationFn: CreateRecipe,
    onSuccess: () => {
      toast.success('Recipe created successfully', { id: 'create-recipe' })
      form.reset()
      setOpen(false)
    },
    onError: () => {
      toast.error('Something went wrong', { id: 'create-recipe' })
    },
  })

  const onSubmit = useCallback(
    (values: createRecipeSchemaType) => {
      toast.loading('Creating recipe...', { id: 'create-recipe' })
      mutation.mutate(values)
    },
    [mutation]
  )

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        form.reset()
        setOpen(open)
      }}
    >
      <DialogTrigger asChild>
        <Button>{triggerText ?? 'Create Recipe'}</Button>
      </DialogTrigger>
      <DialogContent className="p-0 gap-0" aria-label="Create a new recipe">
        <CustomDialogHeader
          icon={ChefHat}
          title="Create a new recipe"
          subTitle="Start by creating a new recipe"
        />
        <Form {...form}>
          <form
            className="space-y-6 w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="max-h-[60vh] px-6 pb-6 flex flex-col gap-4 overflow-auto">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Recipe title
                      <p className="text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter recipe title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Description
                      <p className="text-xs text-muted-foreground">
                        (optional)
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your recipe"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="cookTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cook Time (minutes)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="servings"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Servings</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="cuisineId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cuisine</FormLabel>
                    <SelectCuisine
                      defaultValue={field.value}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CreateIngredientForm form={form} />
            </div>
            <div className="flex justify-end gap-2 py-4 !mt-0 border-t px-6">
              <Button
                type="button"
                variant="outline"
                disabled={mutation.isPending}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending && <Loader2Icon className="animate-spin" />}
                {!mutation.isPending && 'Create'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
