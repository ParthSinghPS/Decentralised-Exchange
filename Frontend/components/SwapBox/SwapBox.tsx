"use client"

import { useState } from "react"
import { ArrowUpDown, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import TokenSelector from "./TokenSelector"
import AmountInput from "./AmountInput"
import { useTokens } from "@/components/providers/TokenProvider"
import { useWallet } from "@/components/providers/WalletProvider"

interface SwapBoxProps {
  mode: "swap" | "buy" | "sell"
}

export default function SwapBox({ mode }: SwapBoxProps) {
  const { selectedTokens, setSelectedToken } = useTokens()
  const { isConnected, connectWallet } = useWallet()
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [isFromLocked, setIsFromLocked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSwapTokens = () => {
    if (selectedTokens.from && selectedTokens.to) {
      // Swap the tokens
      const tempToken = selectedTokens.from
      setSelectedToken("from", selectedTokens.to)
      setSelectedToken("to", tempToken)

      // Swap amounts and lock states
      const tempAmount = fromAmount
      setFromAmount(toAmount)
      setToAmount(tempAmount)
      setIsFromLocked(!isFromLocked)
    }
  }

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value)
    setError("")
    // Mock conversion rate calculation
    if (value && selectedTokens.from && selectedTokens.to) {
      const rate = selectedTokens.from.price / selectedTokens.to.price
      setToAmount((Number.parseFloat(value) * rate).toFixed(6))
    } else {
      setToAmount("")
    }
  }

  const handleToAmountChange = (value: string) => {
    setToAmount(value)
    setError("")
    // Mock conversion rate calculation
    if (value && selectedTokens.from && selectedTokens.to) {
      const rate = selectedTokens.to.price / selectedTokens.from.price
      setFromAmount((Number.parseFloat(value) * rate).toFixed(6))
    } else {
      setFromAmount("")
    }
  }

  const handleSwap = async () => {
    if (!fromAmount || !toAmount) {
      setError("Please enter an amount")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      // Reset form on success
      setFromAmount("")
      setToAmount("")
    } catch (err) {
      setError("Transaction failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-4 sm:p-6">
        {/* From Token */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{mode === "sell" ? "Sell" : "From"}</span>
            <span className="text-sm text-muted-foreground">Balance: 0.00</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 min-w-0">
              <AmountInput
                value={fromAmount}
                onChange={handleFromAmountChange}
                placeholder="0.0"
                disabled={isFromLocked || isLoading}
              />
            </div>
            <div className="w-full sm:w-auto">
              <TokenSelector
                selectedToken={selectedTokens.from}
                onSelect={(token) => setSelectedToken("from", token)}
              />
            </div>
          </div>
        </div>

        {/* Swap Arrow */}
        <div className="flex justify-center my-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSwapTokens}
            disabled={isLoading}
            className="h-10 w-10 rounded-full border border-border hover:bg-accent transition-all duration-200 hover:scale-105"
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>

        {/* To Token */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{mode === "buy" ? "Buy" : "To"}</span>
            <span className="text-sm text-muted-foreground">Balance: 0.00</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 min-w-0">
              <AmountInput
                value={toAmount}
                onChange={handleToAmountChange}
                placeholder="0.0"
                disabled={!isFromLocked || isLoading}
              />
            </div>
            <div className="w-full sm:w-auto">
              <TokenSelector selectedToken={selectedTokens.to} onSelect={(token) => setSelectedToken("to", token)} />
            </div>
          </div>
        </div>

        {/* Exchange Rate */}
        {selectedTokens.from && selectedTokens.to && (
          <div className="text-sm text-muted-foreground mb-4 text-center">
            1 {selectedTokens.from.symbol} = {(selectedTokens.from.price / selectedTokens.to.price).toFixed(6)}{" "}
            {selectedTokens.to.symbol}
          </div>
        )}

        {error && (
          <div className="text-sm text-red-500 mb-4 text-center bg-red-50 dark:bg-red-950/20 p-2 rounded-md">
            {error}
          </div>
        )}

        {/* Action Button */}
        {!isConnected ? (
          <Button onClick={connectWallet} className="w-full" size="lg" disabled={isLoading}>
            Connect Wallet
          </Button>
        ) : (
          <Button onClick={handleSwap} className="w-full" size="lg" disabled={isLoading || !fromAmount || !toAmount}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : mode === "swap" ? (
              "Swap"
            ) : mode === "buy" ? (
              "Buy"
            ) : (
              "Sell"
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
