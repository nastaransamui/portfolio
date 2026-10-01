'use client'

import { useEffect, useState } from 'react'

export function useHash() {
  const [hash, setHash] = useState('')

  useEffect(() => {
    const update = () => setHash(window.location.hash.replace('#', ''))
    update()
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])

  return hash
}