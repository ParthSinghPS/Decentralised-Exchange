import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { WalletProvider } from "@/components/providers/WalletProvider"
import { TokenProvider } from "@/components/providers/TokenProvider"
import Header from "@/components/Header/Header"
import "./globals.css"
import { WagmiProvider } from "wagmi"
import { config } from "@/lib/wagmi"   // make sure this exists
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export const metadata: Metadata = {
  title: "DEX - Decentralized Exchange",
  description: "A Uniswap-like decentralized exchange built with Next.js",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <WalletProvider>
                <TokenProvider>
                  <Suspense fallback={<div>Loading...</div>}>
                    <div className="min-h-screen bg-background">
                      <Header />
                      <main className="container mx-auto px-4 py-8">{children}</main>
                    </div>
                  </Suspense>
                </TokenProvider>
              </WalletProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
