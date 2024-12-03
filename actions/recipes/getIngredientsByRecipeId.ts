'use server'

import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function GetIngredientsByRecipeId(recipeId: string) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  return await prisma.recipeIngredient.findMany({
    where: {
      recipeId,
    },
    include: {
      ingredient: true,
    },
  })
}
