'use server'

import prisma from '@/lib/prisma'
import { updateRecipeSchema, updateRecipeSchemaType } from '@/schema/recipe'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export async function UpdateRecipe(form: updateRecipeSchemaType) {
  const { success, data } = updateRecipeSchema.safeParse(form)

  if (!success) {
    throw new Error('invalid form data')
  }

  const { userId } = await auth()

  if (!userId) {
    throw new Error('unauthenticated')
  }

  const recipeId = data.id as string

  const totalCookTime = data.instructions.reduce((acc, curr) => {
    return acc + curr.cookTime
  }, 0)

  // First update the main recipe
  const result = await prisma.recipe.update({
    where: { id: recipeId, userId },
    data: {
      userId,
      title: data.title,
      description: data.description,
      cookTime: totalCookTime,
      servings: data.servings || 0,
      status: data.status,
      cuisines: {
        deleteMany: {},
        createMany: {
          data: data.cuisines.map((cuisine) => ({
            cuisineId: cuisine.id,
          })),
        },
      },
      ingredients: {
        deleteMany: {},
        createMany: {
          data: data.ingredients.map((ingredient) => ({
            ingredientId: ingredient.id,
            amount: ingredient.amount,
            unit: ingredient.unit,
          })),
        },
      },
      instructions: {
        deleteMany: {},
        createMany: {
          data: data.instructions.map((instruction, index) => ({
            stepNumber: index + 1,
            description: instruction.description,
            cookTime: instruction.cookTime,
          })),
        },
      },
    },
    include: {
      cuisines: true,
      ingredients: true,
      instructions: true,
    },
  })

  if (!result) {
    throw new Error('failed to update recipe')
  }

  redirect('/recipes')
}
