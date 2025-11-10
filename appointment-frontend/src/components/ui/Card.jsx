import React from 'react'

export default function Card({ title, action, children, className = '', hover = false }) {
  return (
    <div className={[
      'rounded-3xl border border-gray-200/80 p-6 bg-white/70 backdrop-blur-sm',
      'shadow-sm hover:shadow-xl transition-all duration-300',
      hover ? 'hover:scale-[1.02] hover:bg-white/90' : '',
      'relative overflow-hidden',
      className
    ].join(' ')}>
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
      
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between">
          {typeof title === 'string' ? (
            <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {title}
            </h3>
          ) : title}
          {action}
        </div>
      )}
      {children}
    </div>
  )
}