import { GetRecipesForUser } from '@/actions/recipes/getRecipesForUser'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle, InboxIcon } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import RecipeCard from './_components/RecipeCard'

export default function RecipesPage() {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Recipes</h1>
          <p className="text-muted-foreground">Manage your recipes</p>
        </div>
        <Link href={'/recipes/create'}>
          <Button>Create recipe</Button>
        </Link>
      </div>
      <div className="h-full py-6">
        <Suspense fallback={<UserRecipesSkeleton />}>
          <UserRecipes />
        </Suspense>
      </div>
    </div>
  )
}

function UserRecipesSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
  )
}

async function UserRecipes() {
  const recipes = await GetRecipesForUser()

  if (!recipes) {
    return (
      <Alert variant={'destructive'}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again later
        </AlertDescription>
      </Alert>
    )
  }

  if (recipes.length === 0) {
    return (
      <div className="flex flex-col gap-4 h-full items-center justify-center">
        <div className="rounded-full bg-accent h-20 w-20 flex items-center justify-center">
          <InboxIcon size={40} className="stroke-primary" />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No recipes created yet</p>
          <p className="text-sm text-muted-foreground">
            Click the button bellow to create your first recipe
          </p>
        </div>
        <Link href={'/recipes/create'}>
          <Button>Create your first recipe</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}
