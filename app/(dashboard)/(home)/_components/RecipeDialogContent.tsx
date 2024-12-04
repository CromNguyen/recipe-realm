'use client'

import { GetRecipeById } from '@/actions/recipes/getRecipeById'
import { Badge } from '@/components/ui/badge'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { FormatCookTime } from '@/lib/format'
import { useQuery } from '@tanstack/react-query'
import { ClockIcon, Loader2Icon, UsersIcon } from 'lucide-react'
import Image from 'next/image'

interface Props {
  recipeId: string
}

export default function RecipeDialogContent({ recipeId }: Props) {
  const { data: recipe, isLoading } = useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => GetRecipeById(recipeId),
  })

  if (!recipe) return null

  if (isLoading) return <Loader2Icon className="w-6 h-6 animate-spin" />

  return (
    <>
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
      <div className="space-y-8 py-4">
        {/* Header */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-xl font-bold">{recipe.title}</h1>
            <p className="text-sm text-muted-foreground">
              {recipe.description}
            </p>
          </div>
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
        </div>
        <Separator />
        {/* Ingredients */}
        <div className="space-y-4">
          <h2 className="text-muted-foreground">Ingredients</h2>
          <ScrollArea className="whitespace-nowrap rounded-md border">
            <div className="flex w-max space-x-8 p-4">
              {recipe.ingredients.map((ingredient) => (
                <div className="flex flex-col gap-1 items-center">
                  <div className="h-10 w-10 bg-accent mb-1"></div>
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
        </div>

        {/* Instructions */}
        <div className="relative flex flex-col gap-6">
          {recipe.instructions.map((instruction) => (
            <div className="flex flex-col gap-2 pl-8 relative">
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
              <div className="absolute top-0.5 left-0 w-4 h-4 m-0 rounded-full border-2 bg-white z-10 border-primary"></div>
            </div>
          ))}
          <div className="absolute top-3 left-[7px] bottom-0 w-[2px] m-0 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>
    </>
  )
}
