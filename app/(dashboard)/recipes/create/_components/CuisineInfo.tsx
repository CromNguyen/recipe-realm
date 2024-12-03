'use client'

import { GetCuisinesForUser } from '@/actions/recipes/getCuisinesForUser'
import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { createRecipeSchemaType } from '@/schema/recipe'
import { useQuery } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'

export default function CuisineInfo() {
  const { control } = useFormContext<createRecipeSchemaType>()

  const query = useQuery({
    queryKey: ['create-recipe', 'select-cuisine'],
    queryFn: () => GetCuisinesForUser(),
  })

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold text-center">
          What cuisine is this recipe?
        </h2>
        <p className="text-sm text-muted-foreground text-center">
          Select the cuisine that best fits your recipe
        </p>
      </div>
      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => {
          return (
            <FormItem>
              {query.data?.map((item) => (
                <FormItem
                  key={item.id}
                  className="flex flex-row items-start space-x-3 space-y-0"
                >
                  <FormControl>
                    <Checkbox
                      checked={
                        field.value
                          ? field.value?.findIndex(
                              (value) => value.id === item.id
                            ) !== -1
                          : false
                      }
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...field.value!, item])
                          : field.onChange(
                              field.value?.filter(
                                (value) => value.id !== item.id
                              )
                            )
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{item.name}</FormLabel>
                </FormItem>
              ))}
              <FormMessage />
            </FormItem>
          )
        }}
      />
    </>
  )
}
