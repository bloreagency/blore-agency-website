import { Metadata } from 'next'

interface SEOProps {
    title: string
    description: string
    canonical?: string
    ogImage?: string
    noindex?: boolean
    keywords?: string[]
}

export function generatePageMetadata({
    title,
    description,
    canonical,
    ogImage = '/images/og-image.jpg',
    noindex = false,
    keywords = []
}: SEOProps): Metadata {
    const baseUrl = 'https://www.bloreagency.com'
    const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl

    return {
        title,
        description,
        keywords: [
            'Blore Agency',
            'digital marketing',
            'web development',
            'branding',
            ...keywords
        ],
        alternates: {
            canonical: fullCanonical,
        },
        openGraph: {
            title,
            description,
            url: fullCanonical,
            siteName: 'Blore Agency',
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
            creator: '@bloreagency_eg',
        },
        robots: {
            index: !noindex,
            follow: !noindex,
        },
    }
}

// Helper for blog posts
export function generateBlogMetadata({
    title,
    description,
    slug,
    publishedTime,
    modifiedTime,
    author = 'Blore Agency',
    tags = [],
    image = '/images/blog-default.jpg'
}: {
    title: string
    description: string
    slug: string
    publishedTime: string
    modifiedTime?: string
    author?: string
    tags?: string[]
    image?: string
}): Metadata {
    const baseUrl = 'https://www.bloreagency.com'
    const url = `${baseUrl}/blog/${slug}`

    return {
        title,
        description,
        keywords: ['Blore Agency', 'blog', ...tags],
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: 'Blore Agency',
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: 'en_US',
            type: 'article',
            publishedTime,
            modifiedTime,
            authors: [author],
            tags,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
            creator: '@bloreagency_eg',
        },
    }
}
