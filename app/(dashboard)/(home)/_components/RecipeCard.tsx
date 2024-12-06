'use client'

import { GetPublishedRecipes } from '@/actions/recipes/getPublishedRecipes'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ClockIcon, HeartIcon, UsersIcon } from 'lucide-react'
import Image from 'next/image'
import RecipeDialogContent from './RecipeDialogContent'
import { FormatCookTime } from '@/lib/format'
import ToggleLikeButton from './ToggleLikeButton'
import { GetFavoritesForUser } from '@/actions/favorite/getFavoritesForUser'

type RecipeData = Awaited<ReturnType<typeof GetPublishedRecipes>>[number]
type FavoriteRecipeData = Awaited<
  ReturnType<typeof GetFavoritesForUser>
>[number]['recipe']

function RecipeCard({ recipe }: { recipe: RecipeData | FavoriteRecipeData }) {
  const recipeImage = (recipe.imageUrls as string[])?.[0]
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer">
          <CardHeader className="p-0">
            <div className="relative aspect-video overflow-hidden">
              {recipeImage ? (
                <Image
                  src={recipeImage}
                  alt={recipe.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">No image</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </CardHeader>
          <div className="flex flex-col justify-between flex-1">
            <CardContent className="space-y-2 p-4">
              <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors">
                {recipe.title}
              </CardTitle>
              <CardDescription className="line-clamp-3 text-sm">
                {recipe.description || 'No description available'}
              </CardDescription>
            </CardContent>

            <CardFooter className="px-4 pb-4 pt-0 justify-between flex items-center">
              <RecipeMetrics
                cookTime={recipe.cookTime}
                servings={recipe.servings}
              />
              <LikeCount count={recipe._count.favorites || 0} />
            </CardFooter>
          </div>
          <ToggleLikeButton
            recipeId={recipe.id}
            isLiked={recipe.favorites.length > 0}
          />
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="font-bold text-xl">
          <DialogTitle className="text-xl">{recipe.title}</DialogTitle>
          <DialogDescription className="text-sm font-medium">
            {recipe.description}
          </DialogDescription>
        </DialogHeader>
        <RecipeDialogContent recipeId={recipe.id} recipeImage={recipeImage} />
      </DialogContent>
    </Dialog>
  )
}

const RecipeMetrics = ({
  cookTime,
  servings,
}: {
  cookTime: number
  servings: number
}) => (
  <div className="flex gap-4">
    <div className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
      <ClockIcon className="h-4 w-4" />
      <span className="text-sm font-medium">{FormatCookTime(cookTime)}</span>
    </div>
    <div className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
      <UsersIcon className="h-4 w-4" />
      <span className="text-sm font-medium">{servings}</span>
    </div>
  </div>
)

const LikeCount = ({ count }: { count: number }) => (
  <button className="flex items-center gap-1.5 text-muted-foreground hover:text-red-500 transition-colors">
    <HeartIcon className="w-4 h-4" />
    <span className="text-sm font-medium">{count}</span>
  </button>
)

export default RecipeCard
