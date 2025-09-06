"use client"

import { Wallet, ChevronDown } from "lucide-react"
import { useWallet } from "@/components/providers/WalletProvider"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"

export default function WalletButton() {
  const { isConnected, address, balance, chainId, connectWallet, disconnectWallet, switchNetwork } = useWallet()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const getNetworkName = (chainId: number | null) => {
    switch (chainId) {
      case 1:
        return "Ethereum"
      case 137:
        return "Polygon"
      case 56:
        return "BSC"
      case 42161:
        return "Arbitrum"
      case 10:
        return "Optimism"
      default:
        return "Unknown"
    }
  }

  const handleConnect = () => {
    if (!isConnected) {
      connectWallet()
    } else {
      setIsDropdownOpen(!isDropdownOpen)
    }
  }

  const handleDisconnect = () => {
    disconnectWallet()
    setIsDropdownOpen(false)
  }

  const handleSwitchNetwork = async (targetChainId: number) => {
    await switchNetwork(targetChainId)
    setIsDropdownOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={handleConnect}
        variant={isConnected ? "secondary" : "default"}
        className="flex items-center gap-2"
      >
        <Wallet className="h-4 w-4" />
        {isConnected ? (
          <>
            <span className="hidden sm:inline">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
            <ChevronDown className="h-3 w-3" />
          </>
        ) : (
          <span>Connect Wallet</span>
        )}
      </Button>

      {isConnected && isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">Connected Account</div>
            <div className="font-mono text-sm">{address}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Balance: {balance} ETH</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Network: {getNetworkName(chainId)}</div>
          </div>

          <div className="p-2">
            <div className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">Switch Network</div>
            <button
              onClick={() => handleSwitchNetwork(1)}
              className="w-full text-left px-2 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              Ethereum Mainnet
            </button>
            <button
              onClick={() => handleSwitchNetwork(137)}
              className="w-full text-left px-2 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              Polygon
            </button>
            <button
              onClick={() => handleSwitchNetwork(42161)}
              className="w-full text-left px-2 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              Arbitrum
            </button>
          </div>

          <div className="p-2 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleDisconnect}
              className="w-full text-left px-2 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
            >
              Disconnect Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
