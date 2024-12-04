'use server'

import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export async function PublishRecipe(id: string) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const recipe = await prisma.recipe.update({
    where: { id, userId },
    data: {
      status: 'PUBLISHED',
    },
  })

  revalidatePath('/recipes')
}
