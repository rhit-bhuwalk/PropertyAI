"use client"

import { Tabs } from "./tabs"

interface HeaderProps {
  address: string
  propertyId: string
  activeTab: string
  onTabChange: (tabId: string) => void
}

export function Header({ address, propertyId, activeTab, onTabChange }: HeaderProps) {
  const tabs = [
    { id: "general", label: "General Property Information", color: "bg-red-500" },
    { id: "zoning", label: "Zoning Information", color: "bg-blue-500" },
    { id: "entitlement", label: "Entitlement Information", color: "bg-green-500" },
    { id: "market", label: "Market Analysis", color: "bg-purple-500" },
  ]

  return (
    <div className="bg-white border rounded-lg shadow-sm mb-6">
      <div className="p-6 border-b">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{address}</h1>
        <p className="text-gray-500">Property ID: {propertyId}</p>
      </div>
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  )
}

