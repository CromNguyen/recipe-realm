'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { RecipeStatus } from '@/types/recipe'
import { Recipe } from '@prisma/client'
import {
  Clock2Icon,
  ConciergeBellIcon,
  MoreVerticalIcon,
  PenIcon,
  TrashIcon,
  RocketIcon,
  Loader2Icon,
  FileTextIcon,
  CheckCircle2Icon,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import DeleteRecipeDialog from './DeleteRecipeDialog'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { PublishRecipe } from '@/actions/recipes/publishRecipe'
import { useMutation } from '@tanstack/react-query'

const statusConfig = {
  [RecipeStatus.DRAFT]: {
    color: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
    icon: FileTextIcon,
    label: 'Draft',
  },
  [RecipeStatus.PUBLISHED]: {
    color: 'bg-green-500/10 text-green-700 dark:text-green-400',
    icon: CheckCircle2Icon,
    label: 'Published',
  },
} as const

function Actions({
  recipeId,
  recipeTitle,
  status,
}: {
  recipeId: string
  recipeTitle: string
  status: string
}) {
  const router = useRouter()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const mutation = useMutation({
    mutationFn: PublishRecipe,
    onSuccess: () => {
      toast.success('Recipe published successfully')
    },
    onError: () => {
      toast.error('Failed to publish recipe')
    },
  })

  return (
    <>
      <DeleteRecipeDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        recipeId={recipeId}
        recipeTitle={recipeTitle}
      />
      <div className="absolute right-2 top-2 flex items-center gap-2">
        {status === RecipeStatus.DRAFT && (
          <Button
            variant="outline"
            size="sm"
            className="text-primary hover:bg-primary/5"
            disabled={mutation.isPending}
            onClick={() => mutation.mutate(recipeId)}
          >
            {mutation.isPending ? (
              <Loader2Icon size={16} className="mr-2 animate-spin" />
            ) : (
              <RocketIcon size={16} className="mr-2" />
            )}
            {mutation.isPending ? 'Publishing...' : 'Publish'}
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <MoreVerticalIcon size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-2"
              onSelect={() => router.push(`/recipes/edit/${recipeId}`)}
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
      </div>
    </>
  )
}

export default function RecipeCard({ recipe }: { recipe: any }) {
  const status = recipe.status as RecipeStatus
  const StatusIcon = statusConfig[status].icon

  return (
    <Card
      className={cn(
        'group overflow-hidden hover:shadow-lg transition-all duration-300 flex cursor-pointer relative'
      )}
    >
      <CardHeader className="w-[400px]">
        <div className="relative aspect-video overflow-hidden">
          {recipe.imageUrls?.[0] ? (
            <Image
              src={recipe.imageUrls[0]}
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
      <CardContent className="p-6">
        <div className="flex items-center gap-2">
          <p className="font-bold text-md">{recipe.title}</p>
          <Badge
            variant="secondary"
            className={cn(
              'flex items-center gap-1',
              statusConfig[status].color
            )}
          >
            <StatusIcon size={14} />
            <span>{statusConfig[status].label}</span>
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {recipe.description}
        </p>
        <div className="flex items-center gap-3 mt-3">
          <Badge
            variant="outline"
            className="space-x-2 text-muted-foreground rounded-sm"
          >
            <Clock2Icon className="h-4 w-4" />
            <span className="text-sm">{recipe.cookTime}m</span>
          </Badge>
          <Badge
            variant="outline"
            className="space-x-2 text-muted-foreground rounded-sm"
          >
            <ConciergeBellIcon className="h-4 w-4" />
            <span className="text-sm">{recipe.servings}</span>
          </Badge>
        </div>
      </CardContent>
      <Actions
        recipeId={recipe.id}
        recipeTitle={recipe.title}
        status={recipe.status}
      />
    </Card>
  )
}
