"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ViewPositionPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Positions</h1>
      <Card>
        <CardHeader>
          <CardTitle>Liquidity Positions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            No liquidity positions found. Create your first position to get started.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
