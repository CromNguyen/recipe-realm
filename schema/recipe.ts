import { z } from 'zod'

export const createRecipeSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  cookTime: z.number().optional(),
  servings: z.number().optional(),
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
        name: z.string(),
        amount: z.number().min(0.1),
        unit: z.string().min(1),
      })
    )
    .min(1, 'Add at least one ingredient'),
  instructions: z.array(
    z.object({
      stepNumber: z.number().optional(),
      description: z.string().min(1, 'Instruction is required'),
      cookTime: z.number().min(0, 'Cook time cannot be negative'),
    })
  ),
})

export const updateRecipeSchema = createRecipeSchema.extend({
  id: z.string().optional(),
  status: z.string().optional(),
})

export type createRecipeSchemaType = z.infer<typeof createRecipeSchema>
export type updateRecipeSchemaType = z.infer<typeof updateRecipeSchema>

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
          name: z.string(),
          amount: z.number().min(0.1),
          unit: z.string().min(1),
        })
      )
      .min(1, 'Add at least one ingredient'),
  }),
  z.object({
    instructions: z.array(
      z.object({
        stepNumber: z.number().optional(),
        description: z.string().min(1, 'Instruction is required'),
        cookTime: z.number().min(0, 'Cook time cannot be negative'),
      })
    ),
  }),
]
