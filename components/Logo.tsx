import { cn } from '@/lib/utils'
import { ChefHat, SquareDashedMousePointer } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Logo({
  fontSize = 'text-2xl',
  iconSize = 20,
  iconOnly = false,
}: {
  fontSize?: string
  iconSize?: number
  iconOnly?: boolean
}) {
  return (
    <Link
      href="/"
      className={cn(
        'text-2xl font-extrabold flex items-center gap-2',
        fontSize
      )}
    >
      {iconOnly && (
        <div className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 p-2">
          <ChefHat size={iconSize} className="stroke-white" />
        </div>
      )}
      {!iconOnly && (
        <>
          <div className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 p-2">
            <ChefHat size={iconSize} className="stroke-white" />
          </div>
          <div>
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Recipe
            </span>
            <span className="text-stone-700 dark:text-stone-300">Realm</span>
          </div>
        </>
      )}
    </Link>
  )
}

export default Logo
