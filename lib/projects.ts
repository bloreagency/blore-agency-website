// lib/projects.ts
import projectsData from '@/data/projects.json'

export type Project = {
  id: string
  slug: string
  title: string
  category: string
  shortDescription: string
  description: string
  fullDescription?: string[]
  client: string
  year: string
  location: string
  services: string[]
  image: string
  images: string[]
  gallery?: string[]
  tags: string[]
  featured: boolean
  results?: {
    [key: string]: string
  }
}

// Convert JSON data to Project type with backward compatibility
export const projects: Project[] = projectsData.map((p: any) => ({
  ...p,
  fullDescription: p.description ? [p.description] : [],
  gallery: p.images || []
}))

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug)
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured)
}

export function getProjectsByCategory(category: string) {
  return projects.filter((p) => p.category === category)
}

export function getAllProjectSlugs() {
  return projects.map((p) => p.slug)
}

// For backward compatibility
export function getProjects() {
  return projects
}