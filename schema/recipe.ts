import { z } from 'zod'

export const createRecipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  cookTime: z.number(),
  servings: z.number(),
  cuisines: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .min(1, 'Add at least one cuisine'),
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

export const createRecipeSchemaMultiStep = [
  z.object({
    title: z.string(),
    description: z.string().optional(),
    servings: z.number().optional(),
  }),

  z.object({
    cuisines: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
        })
      )
      .min(1, 'Add at least one cuisine'),
  }),
  z.object({
    ingredients: z
      .array(
        z.object({
          id: z.string(),
          amount: z.number().min(0.1),
          unit: z.string().min(1),
        })
      )
      .min(1, 'Add at least one ingredient'),
  }),
]
