'use server'

import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function GetCuisinesByRecipeId(recipeId: string) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  return await prisma.recipeCuisine.findMany({
    where: {
      recipeId,
    },
    include: {
      cuisine: true,
    },
  })
}
