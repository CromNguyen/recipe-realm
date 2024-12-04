'use client'

import { GetIngredientsForUser } from '@/actions/recipes/getIngredientsForUser'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createRecipeSchemaType } from '@/schema/recipe'
import { useQuery } from '@tanstack/react-query'
import {
  PlusCircleIcon,
  Trash2Icon,
  UtensilsIcon,
  Loader2Icon,
} from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { Card, CardContent } from '@/components/ui/card'

export default function IngredientInfo() {
  const query = useQuery({
    queryKey: ['create-recipe', 'ingredients'],
    queryFn: () => GetIngredientsForUser(),
  })

  const ingredients = query.data
  const { control, getValues, setValue, watch } =
    useFormContext<createRecipeSchemaType>()

  return (
    <div className="container mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight flex items-center justify-center gap-2">
          <UtensilsIcon className="w-6 h-6 text-primary" />
          What ingredients do you need?
        </h2>
        <p className="text-muted-foreground">
          List all ingredients with their amounts and units
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          {query.isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2Icon className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-end">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="text-primary hover:bg-primary/5"
                  onClick={() => {
                    const currentIngredients = getValues('ingredients')
                    setValue('ingredients', [
                      ...currentIngredients,
                      { id: '', amount: 0, name: '', unit: '' },
                    ])
                  }}
                >
                  <PlusCircleIcon className="w-4 h-4 mr-2" />
                  Add Ingredient
                </Button>
              </div>

              <div className="space-y-4">
                {watch('ingredients')?.map((ingredient, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardContent className="pt-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <FormField
                          control={control}
                          name={`ingredients.${index}.id`}
                          render={({ field }) => (
                            <FormItem className="flex-[2]">
                              <FormLabel className="text-sm">
                                Ingredient
                              </FormLabel>
                              <Select
                                onValueChange={(value) => {
                                  field.onChange(value)
                                  const selectedIngredient = ingredients?.find(
                                    (ing) => ing.id === value
                                  )
                                  if (selectedIngredient) {
                                    setValue(
                                      `ingredients.${index}.name`,
                                      selectedIngredient.name
                                    )
                                  }
                                }}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select ingredient" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {ingredients?.map((ingredient) => (
                                    <SelectItem
                                      key={ingredient.id}
                                      value={ingredient.id}
                                    >
                                      {ingredient.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={control}
                          name={`ingredients.${index}.amount`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel className="text-sm">Amount</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="0"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(
                                      e.target.value === ''
                                        ? undefined
                                        : parseFloat(e.target.value)
                                    )
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={control}
                          name={`ingredients.${index}.unit`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel className="text-sm">Unit</FormLabel>
                              <FormControl>
                                <Input placeholder="g, ml..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex items-end mb-[2px]">
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                              const currentIngredients =
                                getValues('ingredients')
                              setValue(
                                'ingredients',
                                currentIngredients.filter((_, i) => i !== index)
                              )
                            }}
                          >
                            <Trash2Icon className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
