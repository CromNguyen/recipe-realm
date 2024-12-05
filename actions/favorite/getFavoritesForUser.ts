'use server'

import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function GetFavoritesForUser() {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  return await prisma.favorite.findMany({
    where: {
      userId,
    },
    include: {
      recipe: {
        include: {
          favorites: {
            where: {
              userId,
            },
            select: {
              id: true,
            },
          },
          _count: {
            select: {
              favorites: true,
            },
          },
        },
      },
    },
  })
}
