// Animation variants for Framer Motion
export const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -60 },
}

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
}

export const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
}

export const slideInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 60 },
}

export const slideInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -60 },
}

export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
}

export const magneticHover = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
}

// Transition configurations
export const smoothTransition = {
    type: 'spring',
    stiffness: 100,
    damping: 15,
}

export const quickTransition = {
    duration: 0.3,
    ease: [0.6, 0.01, 0.05, 0.95],
}

export const slowTransition = {
    duration: 0.8,
    ease: [0.6, 0.01, 0.05, 0.95],
}

// Viewport settings for scroll animations
export const viewportSettings = {
    once: true,
    margin: '-100px',
    amount: 0.3,
}
