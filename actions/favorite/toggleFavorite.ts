'use server'

import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export const ToggleFavorite = async (recipeId: string) => {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Unauthorized')
  }

  const isLikedByUser = await prisma.favorite.findFirst({
    where: {
      userId,
      recipeId,
    },
  })

  if (isLikedByUser) {
    await prisma.favorite.delete({
      where: { id: isLikedByUser.id },
    })
  } else {
    await prisma.favorite.create({
      data: {
        userId,
        recipeId,
      },
    })
  }

  revalidatePath('/')
}
