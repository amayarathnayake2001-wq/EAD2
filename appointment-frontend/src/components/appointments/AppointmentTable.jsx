import React from 'react'
import Button from '../ui/Button.jsx'

export default function AppointmentTable({ items, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px] table-auto">
        <thead>
          <tr className="text-left text-sm text-gray-600">
            <th className="px-3 py-2">#</th>
            <th className="px-3 py-2">Name</th>
            <th className="px-3 py-2">Email</th>
            <th className="px-3 py-2">Date</th>
            <th className="px-3 py-2">Time</th>
            <th className="px-3 py-2">Service</th>
            <th className="px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((r, i) => (
            <tr key={r.id} className="border-t text-sm">
              <td className="px-3 py-2">{i+1}</td>
              <td className="px-3 py-2 font-medium">{r.name}</td>
              <td className="px-3 py-2">{r.email}</td>
              <td className="px-3 py-2">{r.date}</td>
              <td className="px-3 py-2">{r.time}</td>
              <td className="px-3 py-2">{r.serviceType}</td>
              <td className="px-3 py-2">
                <div className="flex gap-2">
                  <Button className="bg-white text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50" onClick={()=>onEdit(r)}>Edit</Button>
                  <Button className="bg-red-600 hover:bg-red-700" onClick={()=>onDelete(r.id)}>Delete</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
