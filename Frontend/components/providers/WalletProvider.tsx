"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

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

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)

  // Check if wallet is already connected on mount
  useEffect(() => {
    checkConnection()

    if (typeof window !== "undefined" && window.ethereum) {
      // Listen for account changes
      window.ethereum.on("accountsChanged", handleAccountsChanged)
      // Listen for chain changes
      window.ethereum.on("chainChanged", handleChainChanged)

      return () => {
        window.ethereum?.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum?.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [])

  const checkConnection = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" })
        if (accounts.length > 0) {
          setAddress(accounts[0])
          setIsConnected(true)
          await getBalance(accounts[0])
          await getChainId()
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error)
      }
    }
  }

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet()
    } else {
      setAddress(accounts[0])
      getBalance(accounts[0])
    }
  }

  const handleChainChanged = (chainId: string) => {
    setChainId(Number.parseInt(chainId, 16))
  }

  const getBalance = async (address: string) => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [address, "latest"],
        })
        // Convert from wei to ETH
        const ethBalance = (Number.parseInt(balance, 16) / 1e18).toFixed(4)
        setBalance(ethBalance)
      } catch (error) {
        console.error("Error getting balance:", error)
      }
    }
  }

  const getChainId = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const chainId = await window.ethereum.request({ method: "eth_chainId" })
        setChainId(Number.parseInt(chainId, 16))
      } catch (error) {
        console.error("Error getting chain ID:", error)
      }
    }
  }

  const connectWallet = async () => {
    if (typeof window === "undefined") {
      alert("Please use a desktop browser or mobile wallet app")
      return
    }

    if (!window.ethereum) {
      alert("Please install MetaMask or another Web3 wallet")
      return
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts.length > 0) {
        setAddress(accounts[0])
        setIsConnected(true)
        await getBalance(accounts[0])
        await getChainId()
      }
    } catch (error: any) {
      if (error.code === 4001) {
        alert("Please connect to MetaMask")
      } else {
        console.error("Error connecting wallet:", error)
        alert("Failed to connect wallet")
      }
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setAddress(null)
    setBalance(null)
    setChainId(null)
  }

  const switchNetwork = async (targetChainId: number) => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${targetChainId.toString(16)}` }],
        })
      } catch (error: any) {
        if (error.code === 4902) {
          // Network not added to wallet
          alert("Please add this network to your wallet")
        } else {
          console.error("Error switching network:", error)
        }
      }
    }
  }

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        balance,
        chainId,
        connectWallet,
        disconnectWallet,
        switchNetwork,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
