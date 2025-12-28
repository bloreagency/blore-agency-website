export function generateMetadata(params: { title?: string; description?: string; keywords?: string[]; image?: string; url?: string }) {
    const {
        title = "Blore Agency - Digital Marketing & Creative Solutions",
        description = "Transform your brand with Blore Agency. We offer digital marketing, web development, branding, UI/UX design, and AI-powered solutions.",
        keywords = ["digital marketing", "web development", "branding", "UI/UX design"],
        image = "/images/og-image.jpg",
        url = "https://www.bloreagency.com",
    } = params

    return {
        title,
        description,
        keywords,
        openGraph: {
            title,
            description,
            url,
            siteName: "Blore Agency",
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
        alternates: {
            canonical: url,
        },
    }
}

export function generateStructuredData(type: "Organization" | "WebSite" | "Service" | "Product", data: any) {
    const baseUrl = "https://www.bloreagency.com"

    const schemas = {
        Organization: {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Blore Agency",
            url: baseUrl,
            logo: `${baseUrl}/images/blore-logo.png`,
            description: "Digital Marketing & Creative Solutions Agency",
            address: {
                "@type": "PostalAddress",
                addressCountry: "EG",
                addressLocality: "Cairo",
            },
            contactPoint: {
                "@type": "ContactPoint",
                telephone: "+20-120-294-4459",
                contactType: "Customer Service",
                email: "info@bloreagency.com",
            },
            sameAs: [
                "https://www.facebook.com/bloreagency.EG",
                "https://twitter.com/bloreagency_eg",
                "https://www.linkedin.com/company/bloreagency",
                "https://www.instagram.com/bloreagency.eg",
            ],
        },
        WebSite: {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Blore Agency",
            url: baseUrl,
            potentialAction: {
                "@type": "SearchAction",
                target: `${baseUrl}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
            },
        },
        Service: {
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: data.serviceType || "Digital Marketing",
            provider: {
                "@type": "Organization",
                name: "Blore Agency",
            },
            ...data,
        },
        Product: {
            "@context": "https://schema.org",
            "@type": "Product",
            name: data.name,
            description: data.description,
            brand: {
                "@type": "Brand",
                name: "Blore Agency",
            },
            ...data,
        },
    }

    return schemas[type]
}
