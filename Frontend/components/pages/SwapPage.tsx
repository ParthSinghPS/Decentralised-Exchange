"use client"

import { useState } from "react"
import SwapBox from "@/components/SwapBox/SwapBox"

export default function SwapPage() {
  const [activeTab, setActiveTab] = useState<"swap" | "buy" | "sell">("swap")

  return (
    <div className="max-w-md mx-auto px-4 sm:px-0">
      {/* Tabs */}
      <div className="flex bg-muted rounded-lg p-1 mb-6">
        {(["swap", "buy", "sell"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors capitalize ${
              activeTab === tab
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Swap Box */}
      <SwapBox mode={activeTab} />
    </div>
  )
}
