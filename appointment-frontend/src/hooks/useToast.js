import { useCallback, useState } from 'react'

export default function useToast() {
  const [toast, setToast] = useState(null)
  const show = useCallback((message, type='info') => setToast({ message, type }), [])
  const close = useCallback(() => setToast(null), [])
  return { toast, show, close }
}
