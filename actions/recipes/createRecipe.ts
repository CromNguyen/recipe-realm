'use server'

import prisma from '@/lib/prisma'
import { createRecipeSchema, createRecipeSchemaType } from '@/schema/recipe'
import { RecipeStatus } from '@/types/recipe'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export async function CreateRecipe(form: createRecipeSchemaType) {
  const { success, data } = createRecipeSchema.safeParse(form)

  if (!success) {
    throw new Error('invalid form data')
  }

  const { userId } = await auth()

  if (!userId) {
    throw new Error('unauthenticated')
  }

  const result = await prisma.recipe.create({
    data: {
      userId,
      title: data.title,
      description: data.description,
      cookTime: data.cookTime,
      servings: data.servings,
      status: RecipeStatus.DRAFT,

      cuisines: {
        create: {
          cuisineId: data.cuisineId,
        },
      },

      ingredients: {
        create: data.ingredients.map((ingredient) => ({
          ingredientId: ingredient.id,
          amount: ingredient.amount,
          unit: ingredient.unit,
        })),
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
    },
  })

  if (!result) {
    throw new Error('failed to create recipe')
  }

  revalidatePath('/recipes')
}
