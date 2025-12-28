'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { trackEvent } from '@/components/analytics'
import { trackFBLead } from '@/components/marketing-pixels'

interface NewsletterFormProps {
    className?: string
}

export function NewsletterForm({ className = '' }: NewsletterFormProps) {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')

        try {
            // Track newsletter signup
            trackEvent('newsletter_signup', { email })
            trackFBLead()

            // TODO: Integrate with email service (Mailchimp, SendGrid, etc.)
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })

            if (response.ok) {
                setStatus('success')
                setMessage('Thanks for subscribing! Check your email.')
                setEmail('')
            } else {
                throw new Error('Subscription failed')
            }
        } catch (error) {
            setStatus('error')
            setMessage('Something went wrong. Please try again.')
        }
    }

    return (
        <div className={className}>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === 'loading'}
                    className="flex-1 bg-gray-900/50 border-gray-700 text-white"
                    aria-label="Email address for newsletter"
                />
                <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
                >
                    {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </Button>
            </form>
            {message && (
                <p
                    className={`mt-2 text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'
                        }`}
                    role="alert"
                >
                    {message}
                </p>
            )}
        </div>
    )
}
