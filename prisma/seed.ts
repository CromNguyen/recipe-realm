import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const ingredients = [
  // Common ingredients
  { name: 'Salt' },
  { name: 'Black Pepper' },
  { name: 'Olive Oil' },
  { name: 'Garlic' },
  { name: 'Onion' },
  { name: 'Tomato' },
  { name: 'Chicken' },
  { name: 'Rice' },
  { name: 'Pasta' },
  { name: 'Beef' },
  { name: 'Carrot' },
  { name: 'Potato' },
  { name: 'Butter' },
  { name: 'Egg' },
  { name: 'Milk' },
  { name: 'Flour' },
  { name: 'Sugar' },
  { name: 'Lemon' },
  { name: 'Ginger' },
  { name: 'Soy Sauce' },
]

const cuisines = [
  { name: 'Italian' },
  { name: 'Chinese' },
  { name: 'Japanese' },
  { name: 'Mexican' },
  { name: 'Indian' },
  { name: 'Thai' },
  { name: 'French' },
  { name: 'American' },
  { name: 'Mediterranean' },
  { name: 'Korean' },
]

async function main() {
  // Seed Ingredients
  for (const ingredient of ingredients) {
    await prisma.ingredient.upsert({
      where: { name: ingredient.name },
      update: {},
      create: ingredient,
    })
  }

  // Seed Cuisines
  for (const cuisine of cuisines) {
    await prisma.cuisine.upsert({
      where: { name: cuisine.name },
      update: {},
      create: cuisine,
    })
  }

  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
