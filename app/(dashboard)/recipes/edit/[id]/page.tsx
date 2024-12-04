import prisma from '@/lib/prisma'
import { updateRecipeSchemaType } from '@/schema/recipe'
import { RecipeStatus } from '@/types/recipe'
import { auth } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'
import MultiStepForm from '../../create/_components/MultiStepForm'

export default async function EditRecipePage({
  params,
}: {
  params: { id: string }
}) {
  const { userId } = await auth()
  if (!userId) return notFound()

  const recipe = await prisma.recipe.findUnique({
    where: { id: params.id, userId },
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
    },
  })

  if (!recipe) return notFound()

  // Transform the data to match the form structure
  const initialData: updateRecipeSchemaType = {
    title: recipe.title,
    description: recipe.description || undefined,
    servings: recipe.servings || undefined,
    cuisines: recipe.cuisines.map((rc) => ({
      id: rc.cuisine.id,
      name: rc.cuisine.name,
    })),
    status: recipe.status || RecipeStatus.DRAFT,
    ingredients: recipe.ingredients.map((ri) => ({
      id: ri.ingredient.id,
      name: ri.ingredient.name,
      amount: ri.amount,
      unit: ri.unit,
    })),
    instructions: recipe.instructions
      .sort((a, b) => a.stepNumber - b.stepNumber)
      .map((instruction) => ({
        stepNumber: instruction.stepNumber,
        description: instruction.description,
        cookTime: instruction.cookTime,
      })),
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold">Edit recipe</h1>
        <p className="text-muted-foreground">{recipe.title}</p>
      </div>
      <div className="">
        <MultiStepForm
          action="edit"
          initialData={initialData}
          recipeId={params.id}
        />
      </div>
    </div>
  )
}
