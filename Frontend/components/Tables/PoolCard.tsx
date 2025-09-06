"use client"

import Image from "next/image"
import { TrendingUp, Droplets } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Pool {
  id: string
  name: string
  token0: { symbol: string; logoUrl: string }
  token1: { symbol: string; logoUrl: string }
  tvl: number
  apr: number
  volume24h?: number
  fees24h?: number
}

interface PoolCardProps {
  pool: Pool
}

export default function PoolCard({ pool }: PoolCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <Image
                src={pool.token0.logoUrl || "/placeholder.svg"}
                alt={pool.token0.symbol}
                width={24}
                height={24}
                className="rounded-full border-2 border-background"
              />
              <Image
                src={pool.token1.logoUrl || "/placeholder.svg"}
                alt={pool.token1.symbol}
                width={24}
                height={24}
                className="rounded-full border-2 border-background"
              />
            </div>
            <span className="font-bold">{pool.name}</span>
          </div>
          <div className="flex items-center gap-1 text-green-500">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">{pool.apr}%</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground mb-1">TVL</div>
            <div className="font-medium">${(pool.tvl / 1000000).toFixed(1)}M</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">APR</div>
            <div className="font-medium text-green-500">{pool.apr}%</div>
          </div>
        </div>

        {pool.volume24h && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">24h Volume</div>
              <div className="font-medium">${(pool.volume24h / 1000000).toFixed(1)}M</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">24h Fees</div>
              <div className="font-medium">${(pool.fees24h! / 1000).toFixed(0)}K</div>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button className="flex-1" size="sm">
            <Droplets className="h-4 w-4 mr-1" />
            Add Liquidity
          </Button>
          <Button variant="outline" size="sm">
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
