"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Search, TrendingUp, TrendingDown, Loader2 } from "lucide-react"
import { useTokens } from "@/components/providers/TokenProvider"

export default function TokenTable() {
  const { tokens, fetchTokens } = useTokens()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"rank" | "price" | "marketCap" | "change24h">("rank")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadTokens = async () => {
      setIsLoading(true)
      await fetchTokens()
      // Simulate loading delay
      setTimeout(() => setIsLoading(false), 1000)
    }
    loadTokens()
  }, [fetchTokens])

  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedTokens = [...filteredTokens].sort((a, b) => {
    const aValue = a[sortBy]
    const bValue = b[sortBy]

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tokens..."
            disabled
            className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-lg text-sm placeholder:text-muted-foreground opacity-50"
          />
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search tokens..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        />
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th
                  className="px-3 sm:px-6 py-4 text-left text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                  onClick={() => handleSort("rank")}
                >
                  <span className="hidden sm:inline">Rank</span>
                  <span className="sm:hidden">#</span>
                  {sortBy === "rank" && (sortOrder === "asc" ? " ↑" : " ↓")}
                </th>
                <th className="px-3 sm:px-6 py-4 text-left text-sm font-medium text-muted-foreground">Token</th>
                <th className="hidden sm:table-cell px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Symbol
                </th>
                <th
                  className="px-3 sm:px-6 py-4 text-right text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                  onClick={() => handleSort("price")}
                >
                  Price {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="px-3 sm:px-6 py-4 text-right text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                  onClick={() => handleSort("change24h")}
                >
                  <span className="hidden sm:inline">24h Change</span>
                  <span className="sm:hidden">24h</span>
                  {sortBy === "change24h" && (sortOrder === "asc" ? " ↑" : " ↓")}
                </th>
                <th
                  className="hidden lg:table-cell px-6 py-4 text-right text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                  onClick={() => handleSort("marketCap")}
                >
                  Market Cap {sortBy === "marketCap" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedTokens.map((token) => (
                <tr key={token.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-3 sm:px-6 py-4 text-sm text-muted-foreground">#{token.rank}</td>
                  <td className="px-3 sm:px-6 py-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Image
                        src={token.logoUrl || "/placeholder.svg"}
                        alt={token.symbol}
                        width={24}
                        height={24}
                        className="rounded-full sm:w-8 sm:h-8"
                      />
                      <div className="min-w-0">
                        <div className="font-medium truncate">{token.name}</div>
                        <div className="text-sm text-muted-foreground sm:hidden">{token.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-6 py-4 text-sm font-medium">{token.symbol}</td>
                  <td className="px-3 sm:px-6 py-4 text-sm text-right font-medium">${token.price.toLocaleString()}</td>
                  <td className="px-3 sm:px-6 py-4 text-sm text-right">
                    <div
                      className={`flex items-center justify-end gap-1 ${
                        token.change24h >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {token.change24h >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      <span className="font-medium">
                        {token.change24h >= 0 ? "+" : ""}
                        {token.change24h.toFixed(2)}%
                      </span>
                    </div>
                  </td>
                  <td className="hidden lg:table-cell px-6 py-4 text-sm text-right font-medium">
                    ${(token.marketCap / 1000000000).toFixed(2)}B
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
