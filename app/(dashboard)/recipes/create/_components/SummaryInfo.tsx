'use client'

import { createRecipeSchemaType } from '@/schema/recipe'
import { useFormContext } from 'react-hook-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ClockIcon,
  UtensilsIcon,
  ScrollTextIcon,
  UtensilsCrossedIcon,
  UsersIcon,
} from 'lucide-react'

export default function SummaryInfo() {
  const { watch } = useFormContext<createRecipeSchemaType>()
  const formData = watch()

  const totalCookTime = formData.instructions.reduce((acc, curr) => {
    return acc + curr.cookTime
  }, 0)

  return (
    <div className="container space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Review Your Recipe
        </h2>
        <p className="text-muted-foreground">
          Please review all information before submitting
        </p>
      </div>

      <div className="grid gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <UtensilsIcon className="w-5 h-5 text-primary" />
              <CardTitle>Basic Information</CardTitle>
            </div>
            <CardDescription>Recipe details and serving size</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">{formData.title}</h3>
              {formData.description && (
                <p className="text-muted-foreground">{formData.description}</p>
              )}
            </div>
            <div className="flex gap-6">
              {formData.servings && (
                <div className="flex items-center gap-2">
                  <UsersIcon className="w-4 h-4 text-muted-foreground" />
                  <span>{formData.servings} servings</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4 text-muted-foreground" />
                <span>{totalCookTime} minutes</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cuisines */}
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <UtensilsCrossedIcon className="w-5 h-5 text-primary" />
              <CardTitle>Cuisines</CardTitle>
            </div>
            <CardDescription>Selected cuisine categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {formData.cuisines.map((cuisine) => (
                <span
                  key={cuisine.id}
                  className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                >
                  {cuisine.name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ingredients */}
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <UtensilsIcon className="w-5 h-5 text-primary" />
              <CardTitle>Ingredients</CardTitle>
            </div>
            <CardDescription>Required ingredients and amounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {formData.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{ingredient.amount}</span>
                    <span className="text-muted-foreground">
                      {ingredient.unit}
                    </span>
                  </div>
                  <span className="font-medium">{ingredient.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <ScrollTextIcon className="w-5 h-5 text-primary" />
              <CardTitle>Instructions</CardTitle>
            </div>
            <CardDescription>Step-by-step cooking instructions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {formData.instructions.map((instruction, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                      {index + 1}
                    </div>
                    {instruction.cookTime > 0 && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <ClockIcon className="w-3 h-3" />
                        <span>{instruction.cookTime}m</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm leading-relaxed">
                      {instruction.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
