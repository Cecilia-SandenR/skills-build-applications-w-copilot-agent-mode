const configuredCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const hostCodespaceName =
  typeof window === 'undefined'
    ? ''
    : window.location.hostname.match(/^(.+)-5173\.app\.github\.dev$/)?.[1]
const codespaceName = configuredCodespaceName || hostCodespaceName
const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const apiBaseUrl = `${apiOrigin}/api`
export const apiIsConfiguredForCodespaces = Boolean(codespaceName)

export function apiEndpoint(component) {
  return `${apiBaseUrl}/${component}/`
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  const candidates = [
    payload.results,
    payload.items,
    payload.records,
    payload.data,
    payload.data?.results,
    payload.data?.items,
    payload.data?.records,
    payload.data?.data,
  ]

  return candidates.find(Array.isArray) ?? []
}