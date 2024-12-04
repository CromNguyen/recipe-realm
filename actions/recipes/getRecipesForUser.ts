'use server'

import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function GetRecipesForUser() {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Unauthorized')
  }

  return prisma.recipe.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      cuisines: {
        include: {
          cuisine: true,
        },
      },
      ingredients: {
        include: {
          ingredient: true,
        },
      },
    },
  })
}
