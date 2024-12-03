'use client'

import { DeleteRecipe } from '@/actions/recipes/deleteRecipe'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  recipeId: string
  recipeTitle: string
}

function DeleteRecipeDialog({ open, setOpen, recipeId, recipeTitle }: Props) {
  const deleteMutation = useMutation({
    mutationFn: DeleteRecipe,
    onSuccess: () => {
      toast.success('Recipe deleted successfully', { id: recipeId })
    },
    onError: () => {
      toast.error('Failed to delete recipe', { id: recipeId })
    },
  })

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            If you delete <b>{recipeTitle}</b> recipe, you will not be able to
            recover it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteMutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive"
            onClick={() => {
              toast.loading('Deleting recipe...', { id: recipeId })
              deleteMutation.mutate(recipeId)
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteRecipeDialog
