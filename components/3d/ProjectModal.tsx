'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { Project } from '@/lib/projects'
import { useSwipeable } from 'react-swipeable'

interface ProjectModalProps {
    project: Project | null
    isOpen: boolean
    onClose: () => void
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [isImageViewerOpen, setIsImageViewerOpen] = useState(false)
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) {
            window.addEventListener('keydown', handleEscape)
        }
        return () => window.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose])

    // Swipe handlers for image navigation
    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (project?.images && selectedImageIndex < project.images.length - 1) {
                setSelectedImageIndex(prev => prev + 1)
            }
        },
        onSwipedRight: () => {
            if (selectedImageIndex > 0) {
                setSelectedImageIndex(prev => prev - 1)
            }
        },
        trackMouse: true
    })

    const handlePrevImage = () => {
        if (selectedImageIndex > 0) {
            setSelectedImageIndex(prev => prev - 1)
        }
    }

    const handleNextImage = () => {
        if (project?.images && selectedImageIndex < project.images.length - 1) {
            setSelectedImageIndex(prev => prev + 1)
        }
    }

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index)
        setIsImageViewerOpen(true)
    }

    if (!project) return null

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden pointer-events-auto"
                        >
                            {/* Glowing Border */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-75 blur-xl"></div>

                            {/* Modal Content */}
                            <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 rounded-2xl border-2 border-purple-500/50 overflow-hidden shadow-2xl">
                                {/* Close Button */}
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={onClose}
                                    className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-red-500/20 hover:bg-red-500/40 border-2 border-red-500/60 rounded-full backdrop-blur-sm transition-colors group"
                                >
                                    <X className="w-5 h-5 text-red-400 group-hover:text-red-300" />
                                </motion.button>

                                {/* Scrollable Content */}
                                <div className="overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-gray-800/50">
                                    <div className="p-6 md:p-10">
                                        {/* Header */}
                                        <div className="mb-6">
                                            <span className="inline-block px-3 py-1 bg-purple-600/30 border border-purple-500/40 text-purple-300 text-sm rounded-full mb-3">
                                                {project.category}
                                            </span>
                                            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                                                {project.title}
                                            </h2>
                                            <p className="text-lg text-gray-300 leading-relaxed">
                                                {project.description}
                                            </p>
                                        </div>

                                        {/* Main Image */}
                                        <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden mb-6 group">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 80vw"
                                                priority
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
                                        </div>

                                        {/* Project Info Grid */}
                                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                                            <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                                                <div className="text-xs text-gray-400 mb-1">Client</div>
                                                <div className="text-white font-semibold">{project.client}</div>
                                            </div>

                                            <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                                                <div className="text-xs text-gray-400 mb-1">Location</div>
                                                <div className="text-white font-semibold">{project.location}</div>
                                            </div>
                                        </div>

                                        {/* Services */}
                                        {project.services && project.services.length > 0 && (
                                            <div className="mb-6">
                                                <h3 className="text-xl font-bold text-white mb-3">Services Provided</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.services.map((service: string) => (
                                                        <span
                                                            key={service}
                                                            className="px-3 py-1.5 bg-gradient-to-r from-purple-900/40 to-cyan-900/40 text-purple-300 text-sm rounded-full border border-purple-700/30"
                                                        >
                                                            {service}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Tags */}
                                        {project.tags && project.tags.length > 0 && (
                                            <div className="mb-6">
                                                <h3 className="text-xl font-bold text-white mb-3">Technologies</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tags.map((tag: string) => (
                                                        <span
                                                            key={tag}
                                                            className="px-3 py-1.5 bg-gray-800/60 text-gray-300 text-sm rounded-lg border border-gray-700/50"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Image Gallery */}
                                        {project.images && project.images.length > 1 && (
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-3">Project Gallery</h3>
                                                <div {...handlers} className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                    {project.images.slice(1, 7).map((img: string, index: number) => (
                                                        <div
                                                            key={index}
                                                            onClick={() => handleImageClick(index + 1)}
                                                            className="relative h-40 md:h-48 rounded-lg overflow-hidden group cursor-pointer"
                                                        >
                                                            <Image
                                                                src={img}
                                                                alt={`${project.title} - ${index + 1}`}
                                                                fill
                                                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                                                sizes="(max-width: 768px) 50vw, 33vw"
                                                                loading="lazy"
                                                            />
                                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Full-Screen Image Viewer */}
                    {isImageViewerOpen && project.images && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsImageViewerOpen(false)}
                            className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center"
                        >
                            <button
                                onClick={() => setIsImageViewerOpen(false)}
                                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-white" />
                            </button>

                            {/* Navigation Arrows */}
                            {selectedImageIndex > 0 && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                                    className="absolute left-4 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    <ChevronLeft className="w-8 h-8 text-white" />
                                </button>
                            )}

                            {selectedImageIndex < project.images.length - 1 && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                                    className="absolute right-4 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    <ChevronRight className="w-8 h-8 text-white" />
                                </button>
                            )}

                            {/* Image */}
                            <div {...handlers} className="relative w-full h-full max-w-6xl max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
                                <Image
                                    src={project.images[selectedImageIndex]}
                                    alt={`${project.title} - ${selectedImageIndex + 1}`}
                                    fill
                                    className="object-contain"
                                    sizes="100vw"
                                />
                            </div>

                            {/* Image Counter */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
                                {selectedImageIndex + 1} / {project.images.length}
                            </div>
                        </motion.div>
                    )}
                </>
            )}
        </AnimatePresence>
    )
}
