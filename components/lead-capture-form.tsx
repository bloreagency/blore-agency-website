'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { trackEvent } from '@/components/analytics'
import { trackFBLead } from '@/components/marketing-pixels'

interface LeadCaptureFormProps {
    title?: string
    description?: string
    buttonText?: string
    className?: string
}

export function LeadCaptureForm({
    title = 'Get a Free Consultation',
    description = 'Fill out the form and our team will get back to you within 24 hours.',
    buttonText = 'Get Started',
    className = '',
}: LeadCaptureFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
    })
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')

        try {
            // Track lead capture
            trackEvent('lead_capture', {
                form_name: 'consultation_request',
                ...formData,
            })
            trackFBLead()

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setStatus('success')
                setFormData({ name: '', email: '', phone: '', company: '', message: '' })
            } else {
                throw new Error('Submission failed')
            }
        } catch (error) {
            setStatus('error')
        }
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    if (status === 'success') {
        return (
            <div className={`p-8 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-2xl border border-green-500/30 ${className}`}>
                <div className="text-center">
                    <div className="text-5xl mb-4">✅</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                    <p className="text-gray-300">
                        We've received your request. Our team will contact you shortly.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className={`p-8 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 ${className}`}>
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-300 mb-6">{description}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    name="name"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                    className="bg-gray-900/50 border-gray-700 text-white"
                />
                <Input
                    name="email"
                    type="email"
                    placeholder="Your Email *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={status === 'loading'}
                    className="bg-gray-900/50 border-gray-700 text-white"
                />
                <Input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                    className="bg-gray-900/50 border-gray-700 text-white"
                />
                <Input
                    name="company"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                    className="bg-gray-900/50 border-gray-700 text-white"
                />
                <Textarea
                    name="message"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    disabled={status === 'loading'}
                    className="bg-gray-900/50 border-gray-700 text-white resize-none"
                />
                <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
                >
                    {status === 'loading' ? 'Sending...' : buttonText}
                </Button>
                {status === 'error' && (
                    <p className="text-red-400 text-sm" role="alert">
                        Something went wrong. Please try again.
                    </p>
                )}
            </form>
        </div>
    )
}
