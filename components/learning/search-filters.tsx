"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter } from "lucide-react"
import { SearchBar } from "@/components/common/search-bar"

interface SearchFiltersProps {
  searchTerm: string
  selectedSubject: string
  subjects: string[]
  onSearchChange: (value: string) => void
  onSubjectChange: (value: string) => void
}

export function SearchFilters({
  searchTerm,
  selectedSubject,
  subjects,
  onSearchChange,
  onSubjectChange,
}: SearchFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <SearchBar
          placeholder="Search tests by title, subject, or tags..."
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>
      <Select value={selectedSubject} onValueChange={onSubjectChange}>
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="Filter by subject" />
        </SelectTrigger>
        <SelectContent>
          {subjects.map((subject) => (
            <SelectItem key={subject.toLowerCase()} value={subject.toLowerCase()}>
              {subject}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button variant="outline" className="flex items-center gap-2 bg-transparent">
        <Filter className="h-4 w-4" />
        More Filters
      </Button>
    </div>
  )
}
