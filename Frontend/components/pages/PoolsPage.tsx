"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import PoolCard from "@/components/Tables/PoolCard"
import { Button } from "@/components/ui/button"

const mockPools = [
  {
    id: "1",
    name: "ETH/USDC",
    token0: { symbol: "ETH", logoUrl: "/ethereum-logo.jpg" },
    token1: { symbol: "USDC", logoUrl: "/usdc-logo.jpg" },
    tvl: 150000000,
    apr: 12.5,
    volume24h: 25000000,
    fees24h: 75000,
  },
  {
    id: "2",
    name: "UNI/ETH",
    token0: { symbol: "UNI", logoUrl: "/uniswap-logo.jpg" },
    token1: { symbol: "ETH", logoUrl: "/ethereum-logo.jpg" },
    tvl: 85000000,
    apr: 18.2,
    volume24h: 12000000,
    fees24h: 36000,
  },
  {
    id: "3",
    name: "LINK/ETH",
    token0: { symbol: "LINK", logoUrl: "/chainlink-logo.png" },
    token1: { symbol: "ETH", logoUrl: "/ethereum-logo.jpg" },
    tvl: 45000000,
    apr: 15.8,
    volume24h: 8500000,
    fees24h: 25500,
  },
  {
    id: "4",
    name: "AAVE/USDC",
    token0: { symbol: "AAVE", logoUrl: "/aave-logo.png" },
    token1: { symbol: "USDC", logoUrl: "/usdc-logo.jpg" },
    tvl: 32000000,
    apr: 22.1,
    volume24h: 5200000,
    fees24h: 15600,
  },
  {
    id: "5",
    name: "MKR/ETH",
    token0: { symbol: "MKR", logoUrl: "/maker-logo.jpg" },
    token1: { symbol: "ETH", logoUrl: "/ethereum-logo.jpg" },
    tvl: 28000000,
    apr: 19.7,
    volume24h: 4100000,
    fees24h: 12300,
  },
  {
    id: "6",
    name: "COMP/USDC",
    token0: { symbol: "COMP", logoUrl: "/compound-logo.jpg" },
    token1: { symbol: "USDC", logoUrl: "/usdc-logo.jpg" },
    tvl: 18000000,
    apr: 16.4,
    volume24h: 2800000,
    fees24h: 8400,
  },
]

export default function PoolsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"tvl" | "apr" | "volume24h">("tvl")

  const filteredPools = mockPools.filter(
    (pool) =>
      pool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pool.token0.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pool.token1.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedPools = [...filteredPools].sort((a, b) => {
    return b[sortBy] - a[sortBy]
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Liquidity Pools</h1>
        <Button>Create New Pool</Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search pools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>

        <div className="flex gap-2">
          <Button variant={sortBy === "tvl" ? "default" : "outline"} onClick={() => setSortBy("tvl")} size="sm">
            TVL
          </Button>
          <Button variant={sortBy === "apr" ? "default" : "outline"} onClick={() => setSortBy("apr")} size="sm">
            APR
          </Button>
          <Button
            variant={sortBy === "volume24h" ? "default" : "outline"}
            onClick={() => setSortBy("volume24h")}
            size="sm"
          >
            Volume
          </Button>
        </div>
      </div>

      {/* Pool Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="text-sm text-muted-foreground mb-1">Total Value Locked</div>
          <div className="text-2xl font-bold">
            ${(mockPools.reduce((sum, pool) => sum + pool.tvl, 0) / 1000000).toFixed(1)}M
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="text-sm text-muted-foreground mb-1">24h Volume</div>
          <div className="text-2xl font-bold">
            ${(mockPools.reduce((sum, pool) => sum + pool.volume24h, 0) / 1000000).toFixed(1)}M
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="text-sm text-muted-foreground mb-1">24h Fees</div>
          <div className="text-2xl font-bold">
            ${(mockPools.reduce((sum, pool) => sum + pool.fees24h, 0) / 1000).toFixed(0)}K
          </div>
        </div>
      </div>

      {/* Pool Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedPools.map((pool) => (
          <PoolCard key={pool.id} pool={pool} />
        ))}
      </div>
    </div>
  )
}
