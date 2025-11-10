import React from 'react'

export default function Button({ as: As = 'button', className = '', variant = 'primary', ...props }) {
  const base = [
    'inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold',
    'shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
    'backdrop-blur-sm border'
  ].join(' ')

  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 border-transparent',
    secondary: 'bg-white/80 text-gray-700 ring-1 ring-gray-200/80 hover:bg-white hover:ring-gray-300 hover:shadow-lg',
    danger: 'bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700 border-transparent'
  }

  return <As className={[base, variants[variant], className].join(' ')} {...props} />
}