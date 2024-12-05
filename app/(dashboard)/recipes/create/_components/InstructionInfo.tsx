'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
import {
  ClockIcon,
  PlusCircleIcon,
  ScrollTextIcon,
  Trash2Icon,
} from 'lucide-react'
import { useFormContext } from 'react-hook-form'

export default function InstructionInfo() {
  const { control, getValues, setValue, watch } =
    useFormContext<createRecipeSchemaType>()

  // Watch instructions to update total cook time
  const instructions = watch('instructions')

  return (
    <div className="container mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight flex items-center justify-center gap-2">
          <ScrollTextIcon className="w-6 h-6 text-primary" />
          How do you make it?
        </h2>
        <p className="text-muted-foreground">
          Break down your recipe into clear, step-by-step instructions
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex justify-end items-center">
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="text-primary hover:bg-primary/5"
                onClick={() => {
                  const currentInstructions = getValues('instructions') || []
                  setValue('instructions', [
                    ...currentInstructions,
                    {
                      stepNumber: currentInstructions.length + 1,
                      description: '',
                      cookTime: 0,
                    },
                  ])
                }}
              >
                <PlusCircleIcon className="w-4 h-4 mr-2" />
                Add Step
              </Button>
            </div>

            <div className="space-y-4">
              {instructions?.map((instruction, index) => (
                <Card key={index} className="bg-muted/50">
                  <CardContent className="pt-4">
                    <div className="flex gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold shrink-0">
                        {index + 1}
                      </div>

                      <div className="flex-1 space-y-4">
                        <FormField
                          control={control}
                          name={`instructions.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm">
                                Instructions
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder={`Describe step ${index + 1}`}
                                  className="resize-none min-h-[150px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={control}
                          name={`instructions.${index}.cookTime`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm flex items-center gap-2">
                                <ClockIcon className="w-4 h-4 text-primary" />
                                Cook Time (minutes)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="0"
                                  placeholder="0"
                                  className="w-32"
                                  {...field}
                                  onChange={(e) => {
                                    const value = e.target.value
                                    field.onChange(
                                      value === '' ? 0 : parseInt(value)
                                    )
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="shrink-0 self-start"
                        onClick={() => {
                          const currentInstructions = getValues('instructions')
                          setValue(
                            'instructions',
                            currentInstructions.filter((_, i) => i !== index)
                          )
                        }}
                      >
                        <Trash2Icon className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
