import React, { useState } from 'react'
import { z } from 'zod'
import Input from '../ui/Input.jsx'
import Select from '../ui/Select.jsx'
import Button from '../ui/Button.jsx'

const schema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().email('Valid email required'),
  date: z.string().min(1, 'Pick a date'),
  time: z.string().min(1, 'Pick a time'),
  serviceType: z.string().min(1, 'Choose a service')
})

const serviceOptions = ['Consultation', 'Cleaning', 'Whitening', 'Check-up', 'Other']

export default function AppointmentForm({ initial, onCancel, onSaved, onError, save }) {
  const [form, setForm] = useState(() => initial || { name: '', email: '', date: '', time: '', serviceType: serviceOptions[0] })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const edit = Boolean(initial?.id)

  const validate = () => {
    const parsed = schema.safeParse(form)
    if (!parsed.success) {
      const e = {}
      parsed.error.issues.forEach(i => e[i.path[0]] = i.message)
      setErrors(e)
      return false
    }
    setErrors({})
    return true
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)
    try {
      const payload = { name: form.name.trim(), email: form.email.trim(), date: form.date, time: form.time, serviceType: form.serviceType }
      const data = await save(payload, initial?.id)
      onSaved?.(data)
    } catch (err) { onError?.(err) } finally { setSaving(false) }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input label="Name" value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))} error={errors.name} />
        <Input label="Email" type="email" value={form.email} onChange={e=>setForm(f=>({...f, email:e.target.value}))} error={errors.email} />
        <Input label="Date" type="date" value={form.date} onChange={e=>setForm(f=>({...f, date:e.target.value}))} error={errors.date} />
        <Input label="Time" type="time" value={form.time} onChange={e=>setForm(f=>({...f, time:e.target.value}))} error={errors.time} />
        <Select label="Service" value={form.serviceType} onChange={e=>setForm(f=>({...f, serviceType:e.target.value}))}>
          {serviceOptions.map(o=> <option key={o} value={o}>{o}</option>)}
        </Select>
      </div>
      <div className="flex gap-2">
        <Button type="submit" disabled={saving}>{saving ? (edit?'Saving...':'Creating...') : (edit?'Save changes':'Create appointment')}</Button>
        <Button type="button" className="bg-white text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  )
}
