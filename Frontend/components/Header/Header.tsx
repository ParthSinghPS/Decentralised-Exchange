"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import DropdownMenu from "./DropdownMenu"
import SearchBar from "./SearchBar"
import ThemeToggler from "./ThemeToggler"
import WalletButton from "./WalletButton"
import { Button } from "@/components/ui/button"

export default function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const tradeItems = [
    { label: "Swap", href: "/swap" },
    { label: "Buy", href: "/buy" },
    { label: "Sell", href: "/sell" },
  ]

  const exploreItems = [
    { label: "Tokens", href: "/explore/tokens" },
    { label: "Pools", href: "/explore/pools" },
  ]

  const poolItems = [
    { label: "Create Position", href: "/pool/create" },
    { label: "View Position", href: "/pool/view" },
  ]

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-6">
            <Link href="/swap" className="text-xl font-bold text-primary">
              DEX
            </Link>
            <nav className="hidden md:flex items-center gap-4">
              <DropdownMenu
                label="Trade"
                items={tradeItems}
                isActive={pathname.startsWith("/swap") || pathname.startsWith("/buy") || pathname.startsWith("/sell")}
              />
              <DropdownMenu label="Explore" items={exploreItems} isActive={pathname.startsWith("/explore")} />
              <DropdownMenu label="Pool" items={poolItems} isActive={pathname.startsWith("/pool")} />
            </nav>
          </div>

          {/* Center Section */}
          <div className="hidden lg:block">
            <SearchBar />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <div className="lg:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </Button>
            </div>
            <ThemeToggler />
            <div className="hidden sm:block">
              <WalletButton />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="lg:hidden">
                <SearchBar />
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground px-2">Trade</div>
                  {tradeItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground px-2">Explore</div>
                  {exploreItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground px-2">Pool</div>
                  {poolItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Mobile Wallet Button */}
              <div className="sm:hidden pt-2 border-t border-border">
                <WalletButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
