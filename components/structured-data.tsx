export function OrganizationSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Blore Agency",
        "alternateName": "Blore",
        "url": "https://www.bloreagency.com",
        "logo": "https://www.bloreagency.com/images/blore-logo-white.png",
        "description": "A creative digital agency that transforms bold ideas into extraordinary digital experiences. From branding to AI-powered marketing solutions.",
        "email": "info@bloreagency.com",
        "telephone": "+20 120 294 4459",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "EG"
        },
        "sameAs": [
            "https://www.facebook.com/bloreagency.EG",
            "https://twitter.com/bloreagency_eg",
            "https://www.linkedin.com/company/bloreagency",
            "https://www.instagram.com/bloreagency.eg"
        ],
        "founder": {
            "@type": "Person",
            "name": "Hossam Amer"
        },
        "foundingDate": "2020",
        "numberOfEmployees": {
            "@type": "QuantitativeValue",
            "value": "10-50"
        },
        "areaServed": [
            {
                "@type": "Country",
                "name": "Saudi Arabia"
            },
            {
                "@type": "Country",
                "name": "Egypt"
            },
            {
                "@type": "Country",
                "name": "United Arab Emirates"
            }
        ],
        "serviceType": [
            "Digital Marketing",
            "Web Development",
            "Mobile App Development",
            "Branding",
            "Graphic Design",
            "UI/UX Design",
            "Motion Graphics",
            "Video Production",
            "Social Media Marketing",
            "AI-Powered Marketing"
        ]
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

export function WebSiteSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Blore Agency",
        "url": "https://www.bloreagency.com",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.bloreagency.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

export function ServiceSchema({ service }: { service: { name: string; description: string; image?: string } }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": service.name,
        "description": service.description,
        "provider": {
            "@type": "Organization",
            "name": "Blore Agency",
            "url": "https://www.bloreagency.com"
        },
        ...(service.image && { "image": service.image })
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

export function FAQSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}
