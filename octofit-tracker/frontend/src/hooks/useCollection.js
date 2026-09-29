import { useEffect, useState } from 'react'
import { apiEndpoint, normalizeCollection } from '../api.js'

export function useCollection(component) {
  const [reloadCount, setReloadCount] = useState(0)
  const [collection, setCollection] = useState({ data: [], error: '', isLoading: true })

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      setCollection((current) => ({ ...current, error: '', isLoading: true }))

      try {
        const response = await fetch(apiEndpoint(component), { signal: controller.signal })
        if (!response.ok) throw new Error(`API request failed (${response.status})`)

        const payload = await response.json()
        setCollection({ data: normalizeCollection(payload), error: '', isLoading: false })
      } catch (error) {
        if (error.name !== 'AbortError') {
          setCollection({ data: [], error: error.message || 'Unable to load this collection.', isLoading: false })
        }
      }
    }

    loadCollection()
    return () => controller.abort()
  }, [component, reloadCount])

  return { ...collection, reload: () => setReloadCount((current) => current + 1) }
}