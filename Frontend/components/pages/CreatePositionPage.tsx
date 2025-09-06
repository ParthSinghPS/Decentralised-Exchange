"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CreatePositionPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create Liquidity Position</h1>
      <Card>
        <CardHeader>
          <CardTitle>Add Liquidity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">Create a new liquidity position by providing tokens to a pool.</p>
          <Button className="w-full">Coming Soon</Button>
        </CardContent>
      </Card>
    </div>
  )
}
