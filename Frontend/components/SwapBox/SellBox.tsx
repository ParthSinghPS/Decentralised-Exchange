"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import TokenSelector from "./TokenSelector"
import AmountInput from "./AmountInput"
import { useTokens } from "@/components/providers/TokenProvider"
import { useWallet } from "@/components/providers/WalletProvider"

export default function SellBox() {
  const { selectedTokens, setSelectedToken } = useTokens()
  const { isConnected, connectWallet } = useWallet()
  const [tokenAmount, setTokenAmount] = useState("")
  const [usdAmount, setUsdAmount] = useState("")

  const handleTokenAmountChange = (value: string) => {
    setTokenAmount(value)
    // Calculate equivalent USD amount
    if (value && selectedTokens.from) {
      const usd = Number.parseFloat(value) * selectedTokens.from.price
      setUsdAmount(usd.toFixed(2))
    } else {
      setUsdAmount("")
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {/* Token Input */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Sell</span>
            <span className="text-sm text-muted-foreground">Balance: 0.00</span>
          </div>
          <div className="flex gap-2 p-4 border border-border rounded-lg">
            <AmountInput value={tokenAmount} onChange={handleTokenAmountChange} placeholder="0.0" />
            <TokenSelector selectedToken={selectedTokens.from} onSelect={(token) => setSelectedToken("from", token)} />
          </div>
        </div>

        {/* USD Output */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">You'll receive</span>
          </div>
          <div className="flex items-center gap-2 p-4 border border-border rounded-lg bg-muted/50">
            <span className="text-2xl font-medium">$</span>
            <AmountInput
              value={usdAmount}
              onChange={() => {}} // Read-only
              placeholder="0.00"
              disabled={true}
            />
            <span className="text-sm text-muted-foreground font-medium">USD</span>
          </div>
        </div>

        {/* Exchange Rate */}
        {selectedTokens.from && tokenAmount && (
          <div className="text-sm text-muted-foreground mb-4 text-center">
            1 {selectedTokens.from.symbol} = ${selectedTokens.from.price.toLocaleString()}
          </div>
        )}

        {/* Action Button */}
        {!isConnected ? (
          <Button onClick={connectWallet} className="w-full" size="lg">
            Connect Wallet
          </Button>
        ) : (
          <Button className="w-full" size="lg" disabled={!tokenAmount}>
            Sell {selectedTokens.from?.symbol || "Token"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
