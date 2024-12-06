'use client'

import { ToggleFavorite } from '@/actions/favorite/toggleFavorite'
import { cn } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { HeartIcon } from 'lucide-react'
import { toast } from 'sonner'

export default function ToggleLikeButton({
  recipeId,
  isLiked,
}: {
  recipeId: string
  isLiked: boolean
}) {
  const mutation = useMutation({
    mutationFn: ToggleFavorite,
    onSuccess: () => {
      const message = isLiked
        ? 'Removed from your favorites'
        : 'Added to your favorites'
      toast.success(message, {
        id: 'toggle-favorite' + recipeId,
      })
    },
    onError: () => {
      toast.error('Something went wrong', { id: 'toggle-favorite' + recipeId })
    },
  })

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const message = isLiked
      ? 'Removing from your favorite'
      : 'Adding to your favorite'
    toast.loading(message, {
      id: 'toggle-favorite' + recipeId,
    })
    mutation.mutate(recipeId)
  }

  return (
    <button
      disabled={mutation.isPending}
      className="bg-white rounded-full p-2 absolute top-2 right-2 group/button"
      onClick={handleClick}
    >
      <HeartIcon
        className={cn(
          'stroke-rose-600 w-5 h-5 group-hover/button:fill-rose-600 transition-colors duration-300',
          isLiked &&
            'fill-rose-600 group-hover/button:stroke-rose-600 group-hover/button:fill-white',
          mutation.isPending && 'animate-pulse'
        )}
      />
    </button>
  )
}
