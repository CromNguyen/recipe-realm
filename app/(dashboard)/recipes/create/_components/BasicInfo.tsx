'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createRecipeSchemaType } from '@/schema/recipe'
import { CakeIcon, ImageIcon, UsersIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { Card, CardContent } from '@/components/ui/card'
import ImageUpload from '@/components/ImageUpload'

export default function BasicInfo() {
  const { control } = useFormContext<createRecipeSchemaType>()

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Tell us about your recipe
        </h2>
        <p className="text-muted-foreground">
          Start with the basics - give your recipe a name and tell us what makes
          it special
        </p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-6">
          <FormField
            control={control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-lg">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  Recipe Image
                  <span className="text-xs text-primary font-normal">
                    (required)
                  </span>
                </FormLabel>
                <FormDescription>
                  Add a beautiful photo of your finished dish
                </FormDescription>
                <FormControl>
                  <ImageUpload value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-lg">
                  <CakeIcon className="w-5 h-5 text-primary" />
                  Recipe Name
                  <span className="text-xs text-primary font-normal">
                    (required)
                  </span>
                </FormLabel>
                <FormDescription>
                  Choose a name that captures the essence of your dish
                </FormDescription>
                <FormControl>
                  <Input
                    placeholder="e.g., Grandma's Famous Chocolate Cake"
                    className="text-lg"
                    {...field}
                  />
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
                <FormLabel className="text-lg">
                  Description
                  <span className="text-xs text-muted-foreground ml-2 font-normal">
                    (optional)
                  </span>
                </FormLabel>
                <FormDescription>
                  Share the story behind your recipe or any special tips
                </FormDescription>
                <FormControl>
                  <Textarea
                    placeholder="This recipe has been in my family for generations..."
                    className="resize-none min-h-[120px]"
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
                <FormLabel className="flex items-center gap-2 text-lg">
                  <UsersIcon className="w-5 h-5 text-primary" />
                  Number of Servings
                </FormLabel>
                <FormDescription>
                  How many people does this recipe serve?
                </FormDescription>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    placeholder="e.g., 4"
                    className="w-full"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value
                      // Only allow positive numbers
                      if (value === '' || parseInt(value) > 0) {
                        field.onChange(
                          value === '' ? undefined : parseInt(value)
                        )
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  )
}
