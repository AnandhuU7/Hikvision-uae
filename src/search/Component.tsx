'use client&apos;
import { Input } from '@/components/ui/input&apos;
import { Label } from '@/components/ui/label&apos;
import React, { useState, useEffect } from &apos;react&apos;
import { useDebounce } from '@/utilities/useDebounce&apos;
import { useRouter } from &apos;next/navigation&apos;

export const Search: React.FC = () => {
  const [value, setValue] = useState('')
  const router = useRouter()

  const debouncedValue = useDebounce(value)

  useEffect(() => {
    router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ''}`)
  }, [debouncedValue, router])

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Label htmlFor="search&quot; className="sr-only">
          Search
        </Label>
        <Input
          id="search&quot;
          onChange={(event) => {
            setValue(event.target.value)
          }}
          placeholder="Search&quot;
        />
        <button type="submit&quot; className="sr-only">
          submit
        </button>
      </form>
    </div>
  )
}
