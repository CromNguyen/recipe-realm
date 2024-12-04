'use server'

import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { cache } from 'react'

export const GetRecipeById = cache(async (id: string) => {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Unauthorized')
  }

  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: {
      imageUrls: true,
      ingredients: {
        include: {
          ingredient: true,
        },
      },
      instructions: {
        orderBy: {
          stepNumber: 'asc',
        },
      },
      cuisines: {
        include: {
          cuisine: true,
        },
      },
    },
  })

  return recipe
})
