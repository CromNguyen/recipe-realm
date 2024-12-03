import {
  Apple,
  Banana,
  Beef,
  Carrot,
  ChefHat,
  Cookie,
  Egg,
  Fish,
  Grape,
  Milk,
  Sandwich,
  Soup,
  Wheat,
  type LucideIcon,
} from 'lucide-react'

export const INGREDIENT_ICONS: Record<string, LucideIcon> = {
  // Proteins
  Chicken: Beef,
  Beef: Beef,
  Fish: Fish,
  Egg: Egg,

  // Vegetables
  Carrot: Carrot,
  Potato: Carrot,
  Onion: Carrot,
  Garlic: Carrot,

  // Fruits
  Apple: Apple,
  Banana: Banana,
  Grape: Grape,

  // Dairy
  Milk: Milk,
  Butter: Milk,
  Cheese: Milk,

  // Grains
  Rice: Wheat,
  Pasta: Wheat,
  Bread: Sandwich,

  // Condiments
  Sugar: Cookie,
  'Soy Sauce': Soup,

  // Default
  default: ChefHat,
}
