import { GetPublishedRecipes } from '@/actions/recipes/getPublishedRecipes'
import { Suspense, memo } from 'react'
import FilterButton from './_components/FilterButton'
import SearchInputField from './_components/SearchInputField'
import { SearchX } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import RecipeCard from './_components/RecipeCard'

export default function HomePage({
  searchParams,
}: {
  searchParams: {
    query: string
    cuisines: string
    ingredients: string
  }
}) {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex flex-col gap-6">
        <Header />
        <SearchSection />
        <Suspense fallback={<RecipesGridSkeleton />}>
          <RecipesGrid
            searchQuery={searchParams.query}
            cuisines={searchParams.cuisines?.split(',')}
            ingredients={searchParams.ingredients?.split(',')}
          />
        </Suspense>
      </div>
    </div>
  )
}

const Header = memo(() => (
  <div>
    <h1 className="text-3xl font-bold">Discovery</h1>
    <p className="text-muted-foreground">Explore and find new recipes to try</p>
  </div>
))

Header.displayName = 'Header'

const SearchSection = memo(() => (
  <div className="flex gap-4">
    <div className="flex-1">
      <SearchInputField />
    </div>
    <FilterButton />
  </div>
))

SearchSection.displayName = 'SearchSection'

const RecipesGrid = async ({
  searchQuery,
  cuisines,
  ingredients,
}: {
  searchQuery?: string
  cuisines?: string[]
  ingredients?: string[]
}) => {
  const recipes = await GetPublishedRecipes({
    searchQuery,
    cuisines,
    ingredients,
  })

  if (recipes.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}

RecipesGrid.displayName = 'RecipesGrid'

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10">
      <SearchX className="h-10 w-10 text-muted-foreground" />
      <h3 className="font-semibold text-lg">No recipes found</h3>
      <p className="text-muted-foreground text-sm">
        Try adjusting your search or filters
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
