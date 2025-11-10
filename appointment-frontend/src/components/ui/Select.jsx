import React from 'react'

export default function Select({ label, error, className='', children, ...props }) {
  return (
    <label className="block">
      {label && <div className="mb-1 text-sm text-gray-700">{label}</div>}
      <select
        className={[
          'w-full rounded-xl border px-3 py-2 outline-none',
          'border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10',
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
        ].join(' ') + (className ? ' ' + className : '')}
        {...props}
      >{children}</select>
      {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
    </label>
  )
}
