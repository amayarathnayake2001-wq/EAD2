import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { fetchAppointments, createAppointment, updateAppointment, deleteAppointment } from '../services/api.js'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'
import Modal from '../components/ui/Modal.jsx'
import AppointmentForm from '../components/appointments/AppointmentForm.jsx'
import AppointmentTable from '../components/appointments/AppointmentTable.jsx'
import Toast from '../components/ui/Toast.jsx'
import useToast from '../hooks/useToast.js'

export default function Appointments() {
  const { user, role, logout } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const { toast, show, close } = useToast()

  const load = async () => {
    setLoading(true); setError('')
    try {
      const data = await fetchAppointments()
      setItems(Array.isArray(data) ? data : [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const save = async (payload, id) => {
    if (id) return await updateAppointment(id, payload)
    return await createAppointment(payload)
  }

  const remove = async (id) => {
    if (!confirm('Delete this appointment?')) return
    try {
      await deleteAppointment(id)
      setItems(items => items.filter(x => x.id !== id))
      show('Appointment deleted', 'success')
    } catch (e) { show(e.message, 'error') }
  }

  const startEdit = (row) => { setEditing(row); setOpen(true) }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-xl supports-backdrop-blur:bg-white/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white grid place-items-center shadow-lg shadow-blue-500/25">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-400 border-2 border-white"></div>
            </div>
            <div>
              <div className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Appointments
              </div>
              <div className="text-xs text-gray-500">Manage your schedule</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="font-medium text-gray-900">{user?.username}</div>
              <div className="text-xs text-gray-500 capitalize">{role}</div>
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <Button 
              className="bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50 hover:ring-gray-300 hover:shadow-md transition-all duration-200"
              onClick={logout}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        {/* Enhanced Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                Appointment Management
              </h1>
              <p className="text-gray-600 max-w-2xl">
                Create, edit, and manage your appointments with our intuitive scheduling system. 
                Stay organized and never miss an important meeting.
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => { setEditing(null); setOpen(true) }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Appointment
              </Button>
              <Button 
                className="bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50 hover:ring-gray-300 hover:shadow-md transition-all duration-200"
                onClick={load}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-gradient-to-r from-red-50 to-pink-50 p-4 text-red-700 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid place-items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <div className="text-gray-500 font-medium">Loading appointments...</div>
            </div>
          </div>
        ) : (
          <Card 
            title={
              <div className="flex items-center gap-3">
                <span>All Appointments</span>
                <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {items.length} {items.length === 1 ? 'appointment' : 'appointments'}
                </span>
              </div>
            }
            className="shadow-xl border-0 bg-white/80 backdrop-blur-sm"
          >
            <AppointmentTable items={items} onEdit={startEdit} onDelete={remove} />
          </Card>
        )}
      </main>

      <Modal open={open} title={editing ? 'Edit Appointment' : 'Create New Appointment'} onClose={() => setOpen(false)}>
        <AppointmentForm
          initial={editing}
          onCancel={() => setOpen(false)}
          onSaved={(saved) => {
            setOpen(false)
            setEditing(null)
            setItems(items => {
              const exists = items.find(x => x.id === saved.id)
              return exists ? items.map(x => x.id === saved.id ? saved : x) : [saved, ...items]
            })
            show(editing ? 'Changes saved successfully' : 'Appointment created successfully', 'success')
          }}
          onError={(err) => show(err.message, 'error')}
          save={save}
        />
      </Modal>

      {toast && <Toast {...toast} onClose={close} />}
    </div>
  )
}