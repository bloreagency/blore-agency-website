import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Blore Agency - Digital Marketing & Creative Solutions',
        short_name: 'Blore Agency',
        description: 'Transform your brand with cutting-edge digital marketing, web development, and AI-powered solutions',
        start_url: '/',
        display: 'standalone',
        background_color: '#020617',
        theme_color: '#8b5cf6',
        orientation: 'portrait-primary',
        icons: [
            {
                src: '/images/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable'
            },
            {
                src: '/images/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
            },
            {
                src: '/images/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: '/images/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any'
            }
        ],
        categories: ['business', 'marketing', 'design'],
        lang: 'en',
        dir: 'ltr',
        screenshots: [
            {
                src: '/images/screenshot-desktop.png',
                sizes: '1920x1080',
                type: 'image/png',
                form_factor: 'wide',
                label: 'Blore Agency Homepage'
            },
            {
                src: '/images/screenshot-mobile.png',
                sizes: '750x1334',
                type: 'image/png',
                form_factor: 'narrow',
                label: 'Blore Agency Mobile View'
            }
        ],
        shortcuts: [
            {
                name: 'Services',
                short_name: 'Services',
                description: 'View our services',
                url: '/services',
                icons: [{ src: '/images/icon-services.png', sizes: '96x96' }]
            },
            {
                name: 'Contact',
                short_name: 'Contact',
                description: 'Get in touch',
                url: '/contact',
                icons: [{ src: '/images/icon-contact.png', sizes: '96x96' }]
            }
        ],
        related_applications: [],
        prefer_related_applications: false
    }
}
