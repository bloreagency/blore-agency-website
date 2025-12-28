import { Metadata } from 'next'

interface SEOProps {
    title: string
    description: string
    keywords?: string[]
    image?: string
    url?: string
    type?: 'website' | 'article'
    publishedTime?: string
    modifiedTime?: string
}

export function generateSEO({
    title,
    description,
    keywords = [],
    image = '/og-image.jpg',
    url = '',
    type = 'website',
    publishedTime,
    modifiedTime,
}: SEOProps): Metadata {
    const baseUrl = 'https://www.bloreagency.com'
    const fullUrl = `${baseUrl}${url}`
    const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`

    return {
        title,
        description,
        keywords: keywords.join(', '),
        openGraph: {
            type,
            url: fullUrl,
            title,
            description,
            images: [
                {
                    url: fullImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            siteName: 'Blore Agency',
            ...(publishedTime && { publishedTime }),
            ...(modifiedTime && { modifiedTime }),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [fullImage],
            creator: '@bloreagency_eg',
        },
        alternates: {
            canonical: fullUrl,
        },
    }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `https://www.bloreagency.com${item.url}`,
        })),
    }
}

export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Blore Agency',
        url: 'https://www.bloreagency.com',
        logo: 'https://www.bloreagency.com/logo.png',
        description: 'Leading digital agency specializing in AI-powered solutions, Web3 development, and cutting-edge web applications.',
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+20-120-294-4459',
            contactType: 'Customer Service',
            email: 'info@bloreagency.com',
            areaServed: 'EG',
            availableLanguage: ['en', 'ar'],
        },
        sameAs: [
            'https://www.facebook.com/bloreagency.EG',
            'https://twitter.com/bloreagency_eg',
            'https://www.linkedin.com/company/bloreagency',
            'https://www.instagram.com/bloreagency.eg',
        ],
        address: {
            '@type': 'PostalAddress',
            streetAddress: '23 Abbas El-Akkad St.',
            addressLocality: 'Nasr City',
            addressRegion: 'Cairo',
            addressCountry: 'EG',
        },
    }
}
