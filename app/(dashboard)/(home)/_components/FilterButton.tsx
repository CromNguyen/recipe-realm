'use client'

import { GetCuisinesForUser } from '@/actions/recipes/getCuisinesForUser'
import { GetIngredientsForUser } from '@/actions/recipes/getIngredientsForUser'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet'
import { useQuery } from '@tanstack/react-query'
import { Check, ChevronsUpDown, SlidersHorizontal, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter, useSearchParams } from 'next/navigation'

interface FilterState {
  cuisines: string[]
  ingredients: string[]
  cookingTime: string
}

export default function FilterButton() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    cuisines: [],
    ingredients: [],
    cookingTime: '',
  })

  const cuisineQuery = useQuery({
    queryKey: ['discovery-cuisines'],
    queryFn: () => GetCuisinesForUser(),
  })

  const ingredientQuery = useQuery({
    queryKey: ['discovery-ingredients'],
    queryFn: () => GetIngredientsForUser(),
  })

  const handleToggleFilter = (
    type: 'cuisines' | 'ingredients',
    value: string
  ) => {
    setFilters((prev) => {
      const current = prev[type]
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
      return { ...prev, [type]: updated }
    })
  }

  const handleRemoveFilter = (
    type: 'cuisines' | 'ingredients',
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item !== value),
    }))
  }

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (filters.cuisines.length > 0) {
      params.set('cuisines', filters.cuisines.join(','))
    } else {
      params.delete('cuisines')
    }

    if (filters.ingredients.length > 0) {
      params.set('ingredients', filters.ingredients.join(','))
    } else {
      params.delete('ingredients')
    }

    if (filters.cookingTime) {
      params.set('cookingTime', filters.cookingTime)
    } else {
      params.delete('cookingTime')
    }

    router.push(`/?${params.toString()}`)

    setOpen(false)
  }

  const clearFilters = () => {
    setFilters({
      cuisines: [],
      ingredients: [],
      cookingTime: '',
    })

    const params = new URLSearchParams(searchParams.toString())
    params.delete('cuisines')
    params.delete('ingredients')
    params.delete('cookingTime')

    router.push(`/?${params.toString()}`)

    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {(filters.cuisines.length > 0 ||
            filters.ingredients.length > 0 ||
            filters.cookingTime) && (
            <Badge variant="secondary" className="ml-2">
              {filters.cuisines.length +
                filters.ingredients.length +
                (filters.cookingTime ? 1 : 0)}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filter Recipes</SheetTitle>
          <SheetDescription>
            Refine your recipe search with these filters
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-4">
          {/* Active Filters */}
          {(filters.cuisines.length > 0 ||
            filters.ingredients.length > 0 ||
            filters.cookingTime) && (
            <div className="space-y-2">
              <div className="text-sm font-medium">Active Filters</div>
              <div className="flex flex-wrap gap-2">
                {filters.cuisines.map((cuisine) => (
                  <Badge
                    key={cuisine}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {cuisine}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleRemoveFilter('cuisines', cuisine)}
                    />
                  </Badge>
                ))}
                {filters.ingredients.map((ingredient) => (
                  <Badge
                    key={ingredient}
                    variant="secondary"
                    className="flex items-center gap-1 bg-green-300"
                  >
                    {ingredient}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() =>
                        handleRemoveFilter('ingredients', ingredient)
                      }
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Cuisines Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Cuisines</label>
            {cuisineQuery.isLoading && <Skeleton className="h-8 w-full" />}
            {!cuisineQuery.isLoading && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    Select cuisines
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search cuisines..." />
                    <CommandEmpty>No cuisine found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      {cuisineQuery.data?.map((cuisine) => (
                        <CommandItem
                          key={cuisine.id}
                          onSelect={() =>
                            handleToggleFilter('cuisines', cuisine.name)
                          }
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              filters.cuisines.includes(cuisine.name)
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {cuisine.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          </div>

          {/* Ingredients Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Ingredients</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between"
                >
                  Select ingredients
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search ingredients..." />
                  <CommandEmpty>No ingredient found.</CommandEmpty>
                  <CommandGroup className="max-h-64 overflow-auto">
                    {ingredientQuery.data?.map((ingredient) => (
                      <CommandItem
                        key={ingredient.id}
                        onSelect={() =>
                          handleToggleFilter('ingredients', ingredient.name)
                        }
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            filters.ingredients.includes(ingredient.name)
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {ingredient.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <SheetFooter className="flex-row gap-4 sm:justify-between">
          <Button variant="outline" className="w-full" onClick={clearFilters}>
            Clear Filters
          </Button>
          <Button className="w-full" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
