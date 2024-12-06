'use client'

import { GetRecipeById } from '@/actions/recipes/getRecipeById'
import { Badge } from '@/components/ui/badge'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { FormatCookTime } from '@/lib/format'
import { useQuery } from '@tanstack/react-query'
import { ClockIcon, UsersIcon } from 'lucide-react'
import Image from 'next/image'

interface Props {
  recipeId: string
  recipeImage?: string
}

export default function RecipeDialogContent({ recipeId, recipeImage }: Props) {
  const { data: recipe, isLoading } = useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => GetRecipeById(recipeId),
  })

  return (
    <>
      {/* Image */}
      {recipeImage && (
        <div className="relative aspect-video">
          <Image
            src={recipeImage}
            alt={recipe?.title || 'Recipe Image'}
            fill
            className="object-cover"
          />
        </div>
      )}
      {isLoading && <RecipeDialogContentSkeleton />}
      {!isLoading && recipe && (
        <div className="space-y-8">
          <div className="flex gap-4">
            <Badge
              variant={'secondary'}
              className="text-muted-foreground gap-1 py-1.5"
            >
              <ClockIcon size={16} />
              {FormatCookTime(recipe.cookTime)}
            </Badge>
            <Badge
              variant={'secondary'}
              className="text-muted-foreground gap-1 py-1.5"
            >
              <UsersIcon size={16} />
              {recipe.servings}
            </Badge>
          </div>
          {/* Ingredients */}
          <ScrollArea className="whitespace-nowrap rounded-md border">
            <div className="flex w-max space-x-8 p-4">
              {recipe.ingredients.map((ingredient) => (
                <div
                  key={ingredient.id}
                  className="flex flex-col gap-1 items-center"
                >
                  <div className="h-10 w-10 rounded-md overflow-hidden bg-accent mb-1">
                    {ingredient.ingredient.imageUrl && (
                      <Image
                        src={ingredient.ingredient.imageUrl}
                        alt={ingredient.ingredient.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="text-sm font-semibold">
                    {ingredient.ingredient.name}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {ingredient.amount} {ingredient.unit}
                  </p>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          {/* Instructions */}
          <div className="relative flex flex-col gap-6">
            {recipe.instructions.map((instruction) => (
              <div
                key={instruction.id}
                className="flex flex-col gap-2 pl-12 relative"
              >
                <div className="absolute left-0 w-11 h-0.5 top-3 bg-gradient-to-r from-primary to-transparent"></div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold">
                    Step {instruction.stepNumber}
                  </h3>
                  {instruction.cookTime > 0 && (
                    <Badge
                      variant={'secondary'}
                      className="text-muted-foreground gap-1 py-1"
                    >
                      <ClockIcon className="w-4 h-4" />
                      {FormatCookTime(instruction.cookTime)}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {instruction.description}
                </p>
                <div className="absolute top-[5px] left-0 w-4 h-4 m-0 rounded-full border-2 bg-white z-10 border-primary"></div>
              </div>
            ))}
            <div className="absolute top-3 left-[7px] bottom-0 w-[2px] m-0 bg-gradient-to-b from-primary to-transparent" />
          </div>
        </div>
      )}
    </>
  )
}

function RecipeDialogContentSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Description skeleton */}
      <div className="flex gap-4">
        <div className="h-8 w-24 bg-muted rounded"></div>
        <div className="h-8 w-24 bg-muted rounded"></div>
      </div>

      {/* Ingredients skeleton */}
      <div className="border rounded-md p-4">
        <div className="flex space-x-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="h-10 w-10 bg-muted rounded"></div>
              <div className="h-4 w-16 bg-muted rounded"></div>
              <div className="h-3 w-12 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions skeleton */}
      <div className="relative flex flex-col gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-2 pl-12 relative">
            <div className="absolute left-0 w-11 h-0.5 top-3 bg-muted"></div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-20 bg-muted rounded"></div>
              <div className="h-6 w-16 bg-muted rounded"></div>
            </div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="absolute top-[5px] left-0 w-4 h-4 rounded-full bg-muted"></div>
          </div>
        ))}
        <div className="absolute top-3 left-[7px] bottom-0 w-[2px] bg-muted"></div>
      </div>
    </div>
  )
}
