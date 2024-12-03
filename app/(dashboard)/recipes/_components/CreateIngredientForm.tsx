'use client'

import { GetIngredientsForUser } from '@/actions/recipes/getIngredientsForUser'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import { PlusCircleIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'

export default function CreateIngredientForm({
  form,
}: {
  form: UseFormReturn<createRecipeSchemaType>
}) {
  const query = useQuery({
    queryKey: ['ingredients'],
    queryFn: () => GetIngredientsForUser(),
  })

  const ingredients = query.data
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <FormLabel>Ingredients</FormLabel>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => {
            const currentIngredients = form.getValues('ingredients')
            form.setValue('ingredients', [
              ...currentIngredients,
              { id: '', amount: 0, unit: '' },
            ])
          }}
        >
          <PlusCircleIcon className="w-5 h-5 text-primary" />
        </Button>
      </div>

      {form.watch('ingredients')?.map((ingredient, index) => (
        <div key={ingredient.id} className="flex gap-4 items-end">
          <FormField
            control={form.control}
            // @ts-ignore
            name={`ingredients.${index}.id`}
            render={({ field }: { field: any }) => (
              <FormItem className="flex-1">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ingredient" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ingredients?.map((ingredient) => (
                      <SelectItem key={ingredient.id} value={ingredient.id}>
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
            control={form.control}
            name={`ingredients.${index}.amount`}
            render={({ field }) => (
              <FormItem className="w-24">
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Amount"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`ingredients.${index}.unit`}
            render={({ field }) => (
              <FormItem className="w-24">
                <FormControl>
                  <Input placeholder="Unit" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => {
              const currentIngredients = form.getValues('ingredients')
              form.setValue(
                'ingredients',
                currentIngredients.filter((_, i) => i !== index)
              )
            }}
          >
            <Trash2Icon />
          </Button>
        </div>
      ))}
    </div>
  )
}
