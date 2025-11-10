import React, { useEffect } from 'react'

export default function Toast({ message, type = 'info', onClose })  {
  const colors = {
    error: 'bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/25',
    success: 'bg-gradient-to-r from-emerald-500 to-green-500 shadow-lg shadow-emerald-500/25',
    info: 'bg-gradient-to-r from-gray-800 to-gray-600 shadow-lg shadow-gray-500/25'
  }

  const icons = {
    error: '❌',
    success: '✅',
    info: '💡'
  }

  useEffect(() => {
    const t = setTimeout(onClose, 4000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className={[
      'fixed bottom-6 right-6 z-50 rounded-2xl px-5 py-4 text-white shadow-xl',
      'animate-in slide-in-from-right-full duration-300',
      'backdrop-blur-md bg-white/10 border border-white/20',
      colors[type]
    ].join(' ')}>
      <div className="flex items-center gap-3">
        <span className="text-lg">{icons[type]}</span>
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 p-1 rounded-full hover:bg-white/20 transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}