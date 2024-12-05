'use client'

import { ToggleFavorite } from '@/actions/favorite/toggleFavorite'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { Heart, HeartIcon } from 'lucide-react'
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
      className="bg-white/80 shadow-lg rounded-full p-2 absolute top-2 right-2 opacity-0 hover:bg-white group-hover:opacity-100 transition-opacity duration-300"
      onClick={handleClick}
    >
      <HeartIcon
        className={cn(
          'stroke-rose-600 w-6 h-6',
          isLiked && 'fill-rose-600 ',
          mutation.isPending && 'animate-pulse'
        )}
      />
    </button>
  )
}
