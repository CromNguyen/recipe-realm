'use server'

import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function GetIngredientsForUser() {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Unauthorized')
  }

  const ingredients = await prisma.ingredient.findMany()
  return ingredients
}
