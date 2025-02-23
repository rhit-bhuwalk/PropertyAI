"use client"

import { formatKey, formatValue, isNonEmptyObject } from "@/utils/formatters"

interface RecursiveDataTableProps {
  data: Record<string, any>
  level?: number
}

export const RecursiveDataTable: React.FC<RecursiveDataTableProps> = ({ data, level = 0 }) => {
  return (
    <div className={`grid grid-cols-1 gap-2 ${level > 0 ? "ml-4 pl-4 border-l border-gray-200" : ""}`}>
      {Object.entries(data).map(([key, value]) => {
        if (
          value === null ||
          value === undefined ||
          value === "" ||
          (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0)
        ) {
          return null
        }

        // Render nested objects
        if (isNonEmptyObject(value)) {
          return (
            <div key={key} className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">{formatKey(key)}</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <RecursiveDataTable data={value} level={level + 1} />
              </div>
            </div>
          )
        }

        // Render arrays
        if (Array.isArray(value)) {
          return (
            <div key={key} className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">{formatKey(key)}</h4>
              <div className="space-y-2">
                {value.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    {isNonEmptyObject(item) ? (
                      <RecursiveDataTable data={item} level={level + 1} />
                    ) : (
                      <span className="text-gray-600">{formatValue(item, key)}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        }

        // Render primitive values
        return (
          <div key={key} className="flex justify-between items-center p-2 border-b border-gray-100">
            <span className="font-medium text-gray-700">{formatKey(key)}</span>
            <span className="text-gray-600">{formatValue(value, key)}</span>
          </div>
        )
      })}
    </div>
  )
} 