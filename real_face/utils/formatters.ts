export const isNonEmptyObject = (value: any): boolean =>
  value && typeof value === "object" && !Array.isArray(value) && Object.keys(value).length > 0

export const formatValue = (value: any, key: string): string => {
  if (value === null || value === undefined) return ""
  if (key.toLowerCase().includes("date") && !isNaN(Date.parse(value))) {
    return new Date(value).toLocaleDateString()
  }
  if (typeof value === "number") {
    if (key.toLowerCase().includes("amount") || key.toLowerCase().includes("value")) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value)
    }
    if (key.toLowerCase().includes("distance")) {
      return `${value.toFixed(2)} miles`
    }
    return value.toLocaleString()
  }
  if (typeof value === "boolean") return value ? "Yes" : "No"
  return String(value)
}

export const formatKey = (key: string): string =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim() 