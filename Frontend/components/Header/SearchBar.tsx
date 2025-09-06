"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"

export default function SearchBar() {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder for search functionality
    console.log("Searching for:", query)
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search tokens..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-80 pl-10 pr-4 py-2 bg-background border border-input rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        />
      </div>
    </form>
  )
}
