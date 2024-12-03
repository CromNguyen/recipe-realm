'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createRecipeSchemaType } from '@/schema/recipe'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export default function BasicInfo() {
  const { control } = useFormContext<createRecipeSchemaType>()

  return (
    <>
      <h2 className="text-xl font-bold text-center">
        Whats this recipe about?
      </h2>
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex gap-1 items-center">
              Name
              <p className="text-xs text-primary">(required)</p>
            </FormLabel>
            <FormControl>
              <Input placeholder="Enter recipe name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex gap-1 items-center">
              Description
              <p className="text-xs text-muted-foreground">(optional)</p>
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

      <FormField
        control={control}
        name="servings"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Servings</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
