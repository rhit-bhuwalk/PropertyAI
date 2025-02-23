"use client"

import { cn } from "@/lib/utils"

interface Tab {
  id: string
  label: string
  color: string
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="border-b">
      <div className="flex space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-t-lg transition-colors relative",
              activeTab === tab.id ? `text-white ${tab.color}` : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
            )}
          >
            {tab.label}
            {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-current" />}
          </button>
        ))}
      </div>
    </div>
  )
}

