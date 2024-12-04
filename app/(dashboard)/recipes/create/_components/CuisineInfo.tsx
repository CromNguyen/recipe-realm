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
import { Card, CardContent } from '@/components/ui/card'
import { UtensilsCrossedIcon, Loader2Icon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCallback } from 'react'

export default function CuisineInfo() {
  const { control } = useFormContext<createRecipeSchemaType>()

  const query = useQuery({
    queryKey: ['create-recipe', 'select-cuisine'],
    queryFn: () => GetCuisinesForUser(),
  })

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight flex items-center justify-center gap-2">
          <UtensilsCrossedIcon className="w-6 h-6 text-primary" />
          What cuisine is this recipe?
        </h2>
        <p className="text-muted-foreground">
          Select one or more cuisines that best represent your dish
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <FormField
            control={control}
            name="cuisines"
            render={({ field }) => {
              if (query.isLoading) {
                return (
                  <div className="flex items-center justify-center py-8">
                    <Loader2Icon className="w-6 h-6 animate-spin text-primary" />
                  </div>
                )
              }

              return (
                <FormItem className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {query.data?.map((item) => {
                      const isSelected = field.value
                        ? field.value?.findIndex(
                            (value) => value.id === item.id
                          ) !== -1
                        : false

                      return (
                        <div
                          key={item.id}
                          className={cn(
                            'flex items-start space-x-3 space-y-0',
                            'p-4 rounded-lg transition-colors cursor-pointer',
                            'hover:bg-primary/5',
                            isSelected && 'bg-primary/10'
                          )}
                        >
                          <FormItem className="flex items-start space-x-3 space-y-0 m-0">
                            <FormControl>
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={() => {
                                  if (isSelected) {
                                    field.onChange(
                                      field.value?.filter(
                                        (value) => value.id !== item.id
                                      )
                                    )
                                  } else {
                                    field.onChange([
                                      ...(field.value || []),
                                      item,
                                    ])
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-medium cursor-pointer">
                              {item.name}
                            </FormLabel>
                          </FormItem>
                        </div>
                      )
                    })}
                  </div>
                  <FormMessage className="text-center" />
                </FormItem>
              )
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
