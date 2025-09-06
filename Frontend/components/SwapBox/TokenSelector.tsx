"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTokens, type Token } from "@/components/providers/TokenProvider"
import Image from "next/image"

interface TokenSelectorProps {
  selectedToken: Token | null
  onSelect: (token: Token) => void
}

export default function TokenSelector({ selectedToken, onSelect }: TokenSelectorProps) {
  const { tokens } = useTokens()
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery("") // Clear search when closing
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full sm:min-w-[120px] justify-between h-12 sm:h-10"
      >
        {selectedToken ? (
          <>
            <div className="flex items-center gap-2">
              <Image
                src={selectedToken.logoUrl || "/placeholder.svg"}
                alt={selectedToken.symbol}
                width={20}
                height={20}
                className="rounded-full"
              />
              <span className="font-medium">{selectedToken.symbol}</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </>
        ) : (
          <>
            <span>Select Token</span>
            <ChevronDown className="h-4 w-4" />
          </>
        )}
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full sm:w-80 bg-popover border border-border rounded-md shadow-lg z-50">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search tokens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm"
              autoFocus
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredTokens.map((token) => (
              <button
                key={token.id}
                onClick={() => {
                  onSelect(token)
                  setIsOpen(false)
                  setSearchQuery("")
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors text-left"
              >
                <Image
                  src={token.logoUrl || "/placeholder.svg"}
                  alt={token.symbol}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{token.symbol}</div>
                  <div className="text-sm text-muted-foreground truncate">{token.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${token.price.toLocaleString()}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
