"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import TokenSelector from "./TokenSelector"
import AmountInput from "./AmountInput"
import { useTokens } from "@/components/providers/TokenProvider"
import { useWallet } from "@/components/providers/WalletProvider"

export default function BuyBox() {
  const { selectedTokens, setSelectedToken } = useTokens()
  const { isConnected, connectWallet } = useWallet()
  const [usdAmount, setUsdAmount] = useState("")
  const [tokenAmount, setTokenAmount] = useState("")

  const handleUsdAmountChange = (value: string) => {
    setUsdAmount(value)
    // Calculate equivalent token amount
    if (value && selectedTokens.to) {
      const tokens = Number.parseFloat(value) / selectedTokens.to.price
      setTokenAmount(tokens.toFixed(6))
    } else {
      setTokenAmount("")
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {/* USD Input */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Pay with USD</span>
          </div>
          <div className="flex items-center gap-2 p-4 border border-border rounded-lg">
            <span className="text-2xl font-medium">$</span>
            <AmountInput value={usdAmount} onChange={handleUsdAmountChange} placeholder="0.00" />
            <span className="text-sm text-muted-foreground font-medium">USD</span>
          </div>
        </div>

        {/* Token Output */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">You'll receive</span>
          </div>
          <div className="flex gap-2 p-4 border border-border rounded-lg bg-muted/50">
            <AmountInput
              value={tokenAmount}
              onChange={() => {}} // Read-only
              placeholder="0.0"
              disabled={true}
            />
            <TokenSelector selectedToken={selectedTokens.to} onSelect={(token) => setSelectedToken("to", token)} />
          </div>
        </div>

        {/* Exchange Rate */}
        {selectedTokens.to && usdAmount && (
          <div className="text-sm text-muted-foreground mb-4 text-center">
            1 {selectedTokens.to.symbol} = ${selectedTokens.to.price.toLocaleString()}
          </div>
        )}

        {/* Action Button */}
        {!isConnected ? (
          <Button onClick={connectWallet} className="w-full" size="lg">
            Connect Wallet
          </Button>
        ) : (
          <Button className="w-full" size="lg" disabled={!usdAmount}>
            Buy {selectedTokens.to?.symbol || "Token"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
