'use client'
import { GetCuisinesForUser } from '@/actions/recipes/getCuisinesForUser'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function SelectCuisine({
  defaultValue,
  onChange,
}: {
  onChange: (value: string) => void
  defaultValue: string
}) {
  const query = useQuery({
    queryKey: ['select-cuisine'],
    queryFn: () => GetCuisinesForUser(),
  })

  return (
    <Select onValueChange={onChange} defaultValue={defaultValue}>
      <SelectTrigger>
        <SelectValue placeholder="Select a cuisine" />
      </SelectTrigger>
      <SelectContent>
        {query.data?.map((cuisine) => (
          <SelectItem key={cuisine.id} value={cuisine.id}>
            {cuisine.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
