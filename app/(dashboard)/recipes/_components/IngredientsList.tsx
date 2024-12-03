'use client'

import { GetIngredientsByRecipeId } from '@/actions/recipes/getIngredientsByRecipeId'
import { useQuery } from '@tanstack/react-query'
import { INGREDIENT_ICONS } from './common'
import { Loader2Icon } from 'lucide-react'

export default function IngredientsList({ recipeId }: { recipeId: string }) {
  const query = useQuery({
    queryKey: ['ingredients', recipeId],
    queryFn: () => GetIngredientsByRecipeId(recipeId),
    // refetchInterval: 10000,
  })

  // if (query.isLoading) return <Loader2Icon className="animate-spin" />
  if (!query.data || query.data.length === 0) return null

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-bold">Ingredients</h3>
      <div className="grid grid-cols-4 gap-2">
        {query.data.map((ingredient) => {
          const Icon =
            INGREDIENT_ICONS[ingredient.ingredient.name] ??
            INGREDIENT_ICONS['default']
          return (
            <div
              key={ingredient.id}
              className="flex flex-col items-center justify-center rounded-md px-2 py-4 gap-3 bg-primary/10 border-primary"
            >
              <p className="text-sm">
                <Icon className="h-8 w-8 text-primary" />
              </p>
              <p className="font-bold">{ingredient.ingredient.name}</p>
              <p className="text-sm text-muted-foreground">
                {ingredient.amount} {ingredient.unit}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
