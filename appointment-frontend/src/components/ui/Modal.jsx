import React from 'react'
import Card from './Card.jsx'

export default function Modal({ open, title, onClose, children }) {
  if (!open) return null
  
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="max-w-2xl w-full animate-in slide-in-from-bottom-8 duration-300"
        onClick={e => e.stopPropagation()}
      >
        <Card 
          title={title} 
          className="border-0 shadow-2xl bg-white/95 backdrop-blur-md max-h-[90vh] overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="max-h-[calc(90vh-120px)] overflow-y-auto">
            {children}
          </div>
        </Card>
      </div>
    </div>
  )
}