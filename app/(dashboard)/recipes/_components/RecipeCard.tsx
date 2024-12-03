'use client'

import { GetIngredientsByRecipeId } from '@/actions/recipes/getIngredientsByRecipeId'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { RecipeStatus } from '@/types/recipe'
import { Recipe } from '@prisma/client'
import {
  Clock2Icon,
  ConciergeBellIcon,
  MoreVerticalIcon,
  PenIcon,
  TrashIcon,
} from 'lucide-react'
import Image from 'next/image'
import React, { Suspense, useState } from 'react'
import { INGREDIENT_ICONS } from './common'
import { GetCuisinesByRecipeId } from '@/actions/recipes/getICuisinesByRecipeId copy'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import IngredientsList from './IngredientsList'
import CuisinesList from './CuisinesList'
import { Skeleton } from '@/components/ui/skeleton'
import DeleteRecipeDialog from './DeleteRecipeDialog'

const statusColors = {
  [RecipeStatus.DRAFT]: 'bg-yellow-400 text-yellow-600',
  [RecipeStatus.PUBLISHED]: 'bg-primary',
} as const

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const isDraft = recipe.status === RecipeStatus.DRAFT

  return (
    <Card className="relative group/card">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-accent h-20 w-20 overflow-hidden">
            <Image
              alt={recipe.title}
              src="https://via.placeholder.com/100"
              width={100}
              height={100}
            />
          </div>
          <div className="">
            <p className="font-bold text-md">
              {recipe.title}
              <span
                className={cn(
                  'text-xs ml-2 px-2 py-1 rounded-sm',
                  statusColors[recipe.status as RecipeStatus]
                )}
              >
                {isDraft ? 'Draft' : 'Published'}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              {recipe.description}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <Badge
                variant={'outline'}
                className="space-x-2 text-muted-foreground rounded-sm"
              >
                <Clock2Icon className="h-4 w-4" />
                <span className="text-sm">{recipe.cookTime}m</span>
              </Badge>
              <Badge
                variant={'outline'}
                className="space-x-2 text-muted-foreground rounded-sm"
              >
                <ConciergeBellIcon className="h-4 w-4" />
                <span className="text-sm">{recipe.servings}</span>
              </Badge>
            </div>
          </div>
        </div>
        <Actions recipeId={recipe.id} recipeTitle={recipe.title} />
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Suspense fallback={<Skeleton className="h-[180px] w-full" />}>
          <IngredientsList recipeId={recipe.id} />
          <CuisinesList recipeId={recipe.id} />
        </Suspense>
      </CardContent>
    </Card>
  )
}

function Actions({
  recipeId,
  recipeTitle,
}: {
  recipeId: string
  recipeTitle: string
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  return (
    <>
      <DeleteRecipeDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        recipeId={recipeId}
        recipeTitle={recipeTitle}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="absolute right-2 top-2">
          <Button variant="outline" size="sm">
            <div className="flex items-center justify-self-center w-full h-full">
              <MoreVerticalIcon size={18} />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-2"
            onSelect={() => setShowDeleteDialog(true)}
          >
            <PenIcon size={16} />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive flex items-center gap-2"
            onSelect={() => setShowDeleteDialog(true)}
          >
            <TrashIcon size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
