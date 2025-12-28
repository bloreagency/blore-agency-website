// Skip to main content link for accessibility
export function SkipToMain() {
    return (
        <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg focus:shadow-lg"
        >
            Skip to main content
        </a>
    )
}

// Accessible button with proper ARIA
interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    ariaLabel?: string
    loading?: boolean
}

export function AccessibleButton({
    children,
    ariaLabel,
    loading = false,
    disabled,
    ...props
}: AccessibleButtonProps) {
    return (
        <button
            aria-label={ariaLabel}
            aria-busy={loading}
            disabled={disabled || loading}
            {...props}
        >
            {children}
        </button>
    )
}

// Accessible link with external indicator
interface AccessibleLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode
    external?: boolean
}

export function AccessibleLink({
    children,
    external = false,
    href,
    ...props
}: AccessibleLinkProps) {
    return (
        <a
            href={href}
            {...(external && {
                target: '_blank',
                rel: 'noopener noreferrer',
                'aria-label': `${children} (opens in new tab)`
            })}
            {...props}
        >
            {children}
        </a>
    )
}

// Accessible image with lazy loading
interface AccessibleImageProps {
    src: string
    alt: string
    width?: number
    height?: number
    className?: string
    priority?: boolean
}

export function AccessibleImage({
    src,
    alt,
    width,
    height,
    className,
    priority = false
}: AccessibleImageProps) {
    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
        />
    )
}
