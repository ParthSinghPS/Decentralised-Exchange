"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

export interface Token {
  id: string
  symbol: string
  name: string
  logoUrl: string
  price: number
  marketCap: number
  rank: number
  change24h: number
  volume24h: number
}

interface TokenContextType {
  tokens: Token[]
  selectedTokens: {
    from: Token | null
    to: Token | null
  }
  setSelectedToken: (type: "from" | "to", token: Token) => void
  fetchTokens: () => Promise<void>
}

const TokenContext = createContext<TokenContextType | undefined>(undefined)

const mockTokens: Token[] = [
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    logoUrl: "/ethereum-logo.jpg",
    price: 2500,
    marketCap: 300000000000,
    rank: 1,
    change24h: 2.5,
    volume24h: 15000000000,
  },
  {
    id: "usd-coin",
    symbol: "USDC",
    name: "USD Coin",
    logoUrl: "/usdc-logo.jpg",
    price: 1,
    marketCap: 50000000000,
    rank: 2,
    change24h: 0.1,
    volume24h: 8000000000,
  },
  {
    id: "uniswap",
    symbol: "UNI",
    name: "Uniswap",
    logoUrl: "/uniswap-logo.jpg",
    price: 8.5,
    marketCap: 8500000000,
    rank: 3,
    change24h: -1.2,
    volume24h: 250000000,
  },
  {
    id: "chainlink",
    symbol: "LINK",
    name: "Chainlink",
    logoUrl: "/chainlink-logo.png",
    price: 15.75,
    marketCap: 9200000000,
    rank: 4,
    change24h: 4.8,
    volume24h: 420000000,
  },
  {
    id: "aave",
    symbol: "AAVE",
    name: "Aave",
    logoUrl: "/aave-logo.png",
    price: 95.2,
    marketCap: 1400000000,
    rank: 5,
    change24h: -2.1,
    volume24h: 180000000,
  },
  {
    id: "compound",
    symbol: "COMP",
    name: "Compound",
    logoUrl: "/compound-logo.jpg",
    price: 45.6,
    marketCap: 680000000,
    rank: 6,
    change24h: 1.8,
    volume24h: 95000000,
  },
  {
    id: "maker",
    symbol: "MKR",
    name: "Maker",
    logoUrl: "/maker-logo.jpg",
    price: 1250.0,
    marketCap: 1150000000,
    rank: 7,
    change24h: 3.2,
    volume24h: 75000000,
  },
  {
    id: "sushi",
    symbol: "SUSHI",
    name: "SushiSwap",
    logoUrl: "/sushiswap-logo.png",
    price: 1.25,
    marketCap: 160000000,
    rank: 8,
    change24h: -0.8,
    volume24h: 45000000,
  },
]

export function TokenProvider({ children }: { children: React.ReactNode }) {
  const [tokens, setTokens] = useState<Token[]>(mockTokens)
  const [selectedTokens, setSelectedTokens] = useState<{
    from: Token | null
    to: Token | null
  }>({
    from: mockTokens[0], // Default to ETH
    to: mockTokens[1], // Default to USDC
  })

  const setSelectedToken = (type: "from" | "to", token: Token) => {
    setSelectedTokens((prev) => ({
      ...prev,
      [type]: token,
    }))
  }

  const fetchTokens = async () => {
    // Placeholder for API call
    // In production, this would fetch from CoinGecko or similar API
    setTokens(mockTokens)
  }

  return (
    <TokenContext.Provider
      value={{
        tokens,
        selectedTokens,
        setSelectedToken,
        fetchTokens,
      }}
    >
      {children}
    </TokenContext.Provider>
  )
}

export function useTokens() {
  const context = useContext(TokenContext)
  if (context === undefined) {
    throw new Error("useTokens must be used within a TokenProvider")
  }
  return context
}
