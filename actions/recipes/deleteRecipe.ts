'use server'

import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export async function DeleteRecipe(recipeId: string) {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Unauthorized')
  }

  await prisma.recipe.delete({
    where: {
      id: recipeId,
    },
  })

  revalidatePath('/recipes')
}
