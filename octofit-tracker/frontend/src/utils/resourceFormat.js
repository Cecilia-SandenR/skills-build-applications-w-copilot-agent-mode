export function displayReference(value) {
  if (value && typeof value === 'object') {
    return value.username || value.name || value.email || value._id || 'Unknown'
  }
  if (typeof value === 'string') return `Member ${value.slice(-6)}`
  return 'Unknown'
}

export function formatDate(value) {
  if (!value) return 'Not dated'
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? 'Not dated'
    : new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'short', year: 'numeric' }).format(date)
}

export function formatLabel(value) {
  if (!value) return 'Unspecified'
  return String(value).replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
}