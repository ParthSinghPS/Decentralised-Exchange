"use client"

import type React from "react"
import { createContext, useContext } from "react"
import { WagmiProvider, useAccount, useBalance, useConnect, useDisconnect, useSwitchChain } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { config } from "@/lib/wagmi"
import { injected } from "wagmi/connectors"

interface WalletContextType {
  isConnected: boolean
  address: string | null
  balance: string | null
  chainId: number | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  switchNetwork: (chainId: number) => Promise<void>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

function WalletContextProvider({ children }: { children: React.ReactNode }) {
  const { address, isConnected, chainId } = useAccount()
  const { data: balanceData } = useBalance({ address })
  const { connectors, connectAsync } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChainAsync } = useSwitchChain()

  // Map wagmi → your variable names
  const balance = balanceData ? parseFloat(balanceData.formatted).toFixed(4) : null

  const connectWallet = async () => {
    try {
      const injectedConnector = connectors.find(c => c.id === "injected")
      if (!injectedConnector) throw new Error("No injected connector found")

      await connectAsync({ connector: injectedConnector })
    } catch (error) {
      console.error("Error connecting wallet:", error)
      throw error
    }
  }
  
  const disconnectWallet = () => {
    try {
      disconnect()
    } catch (error) {
      console.error("Error disconnecting wallet:", error)
    }
  }

  const switchNetwork = async (targetChainId: number) => {
    try {
      await switchChainAsync({ chainId: targetChainId })
    } catch (error) {
      console.error("Error switching network:", error)
      throw error
    }
  }

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address: address ?? null,
        balance,
        chainId: chainId ?? null,
        connectWallet,
        disconnectWallet,
        switchNetwork,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

const queryClient = new QueryClient()

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletContextProvider>{children}</WalletContextProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
