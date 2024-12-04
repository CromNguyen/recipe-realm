'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { GetRecipeById } from '@/actions/recipes/getRecipeById'
import Image from 'next/image'
import { ClockIcon, UsersIcon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'

interface RecipeDialogProps {
  recipeId: string
  isOpen: boolean
  onClose: () => void
}

export default function RecipeDialog({
  recipeId,
  isOpen,
  onClose,
}: RecipeDialogProps) {
  const [recipe, setRecipe] = useState<Awaited<
    ReturnType<typeof GetRecipeById>
  > | null>(null)

  useEffect(() => {
    if (isOpen && recipeId) {
      GetRecipeById(recipeId).then(setRecipe)
    }
  }, [recipeId, isOpen])

  if (!recipe) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-8 py-4">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{recipe.title}</h1>
            <p className="text-lg text-muted-foreground">
              {recipe.description}
            </p>

            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5" />
                <span>{recipe.cookTime} minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <UsersIcon className="w-5 h-5" />
                <span>{recipe.servings} servings</span>
              </div>
            </div>
          </div>

          {/* Image */}
          {recipe.imageUrls?.[0] && (
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={recipe.imageUrls[0].url}
                alt={recipe.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Ingredients */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Ingredients</h2>
            <Separator />
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {recipe.ingredients.map((item) => (
                <li key={item.id} className="flex items-center gap-2">
                  <span className="text-muted-foreground">•</span>
                  <span>
                    {item.amount} {item.unit} {item.ingredient.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Instructions</h2>
            <Separator />
            <div className="space-y-6">
              {recipe.instructions.map((instruction) => (
                <div
                  key={instruction.id}
                  className="flex items-start gap-4 p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full">
                    {instruction.stepNumber}
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="text-muted-foreground">
                      {instruction.description}
                    </p>
                    {instruction.cookTime > 0 && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ClockIcon className="w-4 h-4" />
                        <span>{instruction.cookTime} minutes</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
