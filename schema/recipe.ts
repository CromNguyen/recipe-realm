import { z } from 'zod'

export const createRecipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  cookTime: z.number(),
  servings: z.number(),
  cuisineId: z.string(),
  ingredients: z
    .array(
      z.object({
        id: z.string(),
        amount: z.number().min(0.1),
        unit: z.string().min(1),
      })
    )
    .min(1, 'Add at least one ingredient'),
})

export type createRecipeSchemaType = z.infer<typeof createRecipeSchema>
