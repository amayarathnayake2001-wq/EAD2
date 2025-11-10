import React from 'react'

export default function Input({ label, error, className = '', ...props }) {
  return (
    <label className="block group">
      {label && (
        <div className="mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
          {label}
          {error && (
            <span className="text-red-500 text-xs">• {error}</span>
          )}
        </div>
      )}
      <input
        className={[
          'w-full rounded-2xl border px-4 py-3 outline-none transition-all duration-200',
          'border-gray-300 bg-white/50 backdrop-blur-sm',
          'focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10',
          'hover:border-gray-400 hover:bg-white/70',
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : '',
          'placeholder:text-gray-400'
        ].join(' ') + (className ? ' ' + className : '')}
        {...props}
      />
    </label>
  )
}