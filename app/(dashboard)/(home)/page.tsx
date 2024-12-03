import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Filter } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Discover</h1>
        <p className="text-muted-foreground">
          Discover delicious recipes from around the world
        </p>
      </div>
      <FiltersWrapper />
    </div>
  )
}

function FiltersWrapper() {
  return (
    <div className="flex items-center gap-2">
      <Input placeholder="Enter a recipe name..." size={36} />
      <Button>Search</Button>
    </div>
  )
}
