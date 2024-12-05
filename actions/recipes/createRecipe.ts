'use server'

import prisma from '@/lib/prisma'
import { createRecipeSchema, createRecipeSchemaType } from '@/schema/recipe'
import { RecipeStatus } from '@/types/recipe'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export async function CreateRecipe(form: createRecipeSchemaType) {
  const { success, data } = createRecipeSchema.safeParse(form)

  if (!success) {
    throw new Error('invalid form data')
  }

  const { userId } = await auth()

  if (!userId) {
    throw new Error('unauthenticated')
  }

  const totalCookTime = data.instructions.reduce((acc, curr) => {
    return acc + curr.cookTime
  }, 0)

  const result = await prisma.recipe.create({
    data: {
      userId,
      title: data.title,
      description: data.description,
      cookTime: totalCookTime,
      servings: data.servings || 0,
      status: RecipeStatus.DRAFT,

      cuisines: {
        create: data.cuisines.map((cuisine) => ({
          cuisineId: cuisine.id,
        })),
      },

      ingredients: {
        create: data.ingredients.map((ingredient) => ({
          ingredientId: ingredient.id,
          amount: ingredient.amount,
          unit: ingredient.unit,
        })),
      },

      instructions: {
        create: data.instructions.map((instruction, index) => ({
          stepNumber: index + 1,
          description: instruction.description,
          cookTime: instruction.cookTime,
        })),
      },

      imageUrls: {
        create: {
          url: data.imageUrl,
        },
      },
    },
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
      instructions: true,
      imageUrls: true,
    },
  })

  if (!result) {
    throw new Error('failed to create recipe')
  }

  redirect('/recipes')
}
