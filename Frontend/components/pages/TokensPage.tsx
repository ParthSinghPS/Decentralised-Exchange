"use client"

import TokenTable from "@/components/Tables/TokenTable"

export default function TokensPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Top Tokens</h1>
      <TokenTable />
    </div>
  )
}
