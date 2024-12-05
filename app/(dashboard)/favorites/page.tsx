import { GetFavoritesForUser } from '@/actions/favorite/getFavoritesForUser'
import React, { Suspense } from 'react'
import RecipeCard from '../(home)/_components/RecipeCard'
import { SearchX } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export default function FavoritesPage() {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">My favorites</h1>
        <p className="text-muted-foreground">Manage your favorite recipes</p>
      </div>
      <div className="h-full py-6">
        <Suspense fallback={<RecipesGridSkeleton />}>
          <RecipesGrid />
        </Suspense>
      </div>
    </div>
  )
}

const RecipesGrid = async () => {
  const favorites = await GetFavoritesForUser()

  if (favorites.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {favorites.map((favorite) => (
        <RecipeCard key={favorite.id} recipe={favorite.recipe} />
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10">
      <SearchX className="h-10 w-10 text-muted-foreground" />
      <h3 className="font-semibold text-lg">No recipes found</h3>
      <p className="text-muted-foreground text-sm">
        Add some recipes to your favorites
      </p>
    </div>
  )
}

function RecipesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-[300px] rounded-xl" />
      ))}
    </div>
  )
}
