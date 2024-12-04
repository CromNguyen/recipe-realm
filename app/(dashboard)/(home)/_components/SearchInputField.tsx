'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { debounce } from '@/lib/debounce'
import { cn } from '@/lib/utils'
import { SearchIcon, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useState, memo } from 'react'

const SearchInputField = memo(function SearchInputField() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('query') || ''
  )

  const createQueryString = useMemo(() => {
    return (searchQuery: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (searchQuery) {
        params.set('query', searchQuery)
      } else {
        params.delete('query')
      }
      return params.toString()
    }
  }, [searchParams])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDebounceSearch = useCallback(
    debounce((searchQuery: string) => {
      const queryString = createQueryString(searchQuery)
      router.push(queryString ? `/?${queryString}` : '/')
    }, 500),
    [router, createQueryString]
  )

  const handleInputChange = useCallback(
    (value: string) => {
      setSearchQuery(value)
      handleDebounceSearch(value)
    },
    [handleDebounceSearch]
  )

  const handleClear = useCallback(() => {
    handleInputChange('')
  }, [handleInputChange])

  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        placeholder="Search recipe name..."
        className="pl-9"
        value={searchQuery}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      {searchQuery && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
          onClick={handleClear}
        >
          <X />
        </Button>
      )}
    </div>
  )
})

export default SearchInputField
