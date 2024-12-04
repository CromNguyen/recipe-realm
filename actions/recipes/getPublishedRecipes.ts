'use server'

import prisma from '@/lib/prisma'
import { RecipeStatus } from '@/types/recipe'
import { auth } from '@clerk/nextjs/server'
import { cache } from 'react'

interface FilterOptions {
  searchQuery?: string
  cuisines?: string[]
  ingredients?: string[]
}

export const GetPublishedRecipes = cache(async (filters: FilterOptions) => {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Unauthorized')
  }

  const where = {
    status: RecipeStatus.PUBLISHED,
    ...(filters.searchQuery && { title: { contains: filters.searchQuery } }),
    ...(filters.cuisines?.length && {
      cuisines: {
        some: {
          cuisine: {
            name: { in: filters.cuisines },
          },
        },
      },
    }),
    ...(filters.ingredients?.length && {
      ingredients: {
        some: {
          ingredient: {
            name: { in: filters.ingredients },
          },
        },
      },
    }),
  }

  return prisma.recipe.findMany({
    where,
    select: {
      id: true,
      title: true,
      description: true,
      cookTime: true,
      servings: true,
      cuisines: {
        select: {
          cuisine: {
            select: {
              name: true,
            },
          },
        },
      },
      imageUrls: true,
      favorites: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
})
