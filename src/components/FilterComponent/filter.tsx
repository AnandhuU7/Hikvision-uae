'use client'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Category } from '@/payload-types'

function handleCategoryChange(value: string): void {
  throw new Error('Function not implemented.')
}

type FilterComponentProps = {
  categories: {
    docs: Category[]
  }
}
const FilterComponent = ({ categories }: FilterComponentProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()

  const handleCategoryChange = (value: string): void => {
    setSelectedCategory(value)
  }
  return (
    <Select onValueChange={handleCategoryChange} value={selectedCategory ?? ''}>
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="All" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem key={0} value="0">
          All
        </SelectItem>
        {categories.docs.map((category) => (
          <SelectItem key={category.id} value={category.id?.toString()} className="text-black">
            {category.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default FilterComponent