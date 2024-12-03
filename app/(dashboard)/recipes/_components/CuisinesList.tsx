'use client'

import { GetCuisinesByRecipeId } from '@/actions/recipes/getICuisinesByRecipeId copy'
import { useQuery } from '@tanstack/react-query'

export default function CuisinesList({ recipeId }: { recipeId: string }) {
  const query = useQuery({
    queryKey: ['cuisines', recipeId],
    queryFn: () => GetCuisinesByRecipeId(recipeId),
  })

  if (!query.data || query.data.length === 0) return null

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-bold">Cuisines</h3>
      <div className="grid grid-cols-3 gap-2">
        {query.data.map((cuisine) => (
          <div
            key={cuisine.cuisineId}
            className="flex flex-col items-center justify-center rounded-md p-1 bg-secondary max-w-20"
          >
            <p className="text-sm">{cuisine.cuisine.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
