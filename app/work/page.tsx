'use client'

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProjects } from "@/lib/projects";
import Project3DCard from "@/components/3d/Project3DCard";
import ProjectModal from "@/components/3d/ProjectModal";
import { useState } from "react";
import type { Project } from "@/lib/projects";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WorkPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t } = useLanguage();

  const projects = getProjects();

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  const clientLogos = Array.from({ length: 12 }, (_, i) => ({
    src: `/images/client-logo-${i + 1}.png`,
    alt: `Client Logo ${i + 1}`,
  }));

  return (
    <div className="min-h-screen bg-gray-950">
      {/* ========= Hero (RGB) ========= */}
      <section className="pt-32 pb-20 px-4 rgb-animated relative overflow-hidden">
        <div
          className="absolute inset-0 bg-black/30 pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {t('work.hero.title')}
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            {t('work.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* ========= Clients (Horizontal Marquee) ========= */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-10">
            {t('work.clients.title')}
          </h2>

          <div className="clients-marquee">
            <div className="clients-track">
              {[...clientLogos, ...clientLogos].map((logo, idx) => (
                <div key={idx} className="h-14 flex items-center justify-center">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={140}
                    height={56}
                    className="object-contain opacity-80 hover:opacity-100 transition"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========= Portfolio Grid (3D Interactive Cards) ========= */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Project3DCard
                key={project.slug}
                project={project}
                index={index}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========= Leadership ========= */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              {t('work.leadership.title')}
            </h2>
            <p className="text-xl text-gray-300">
              {t('work.leadership.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-2 border border-gray-800">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image
                  src="/hossam-amer.jpg"
                  alt="Hossam Amer"
                  fill
                  sizes="96px"
                  className="rounded-full border-4 border-white shadow-md object-cover"
                />
              </div>
              <h3 className="font-semibold text-xl text-white">
                Hossam Amer
              </h3>
              <p className="text-purple-400 text-sm mb-4">
                Chief Executive Officer
              </p>
              <p className="text-gray-300 italic text-sm">
                "{t('work.leadership.ceo_quote')}"
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-2 border border-gray-800">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image
                  src="/mohamed-hassan.jpg"
                  alt="Mohamed Hassan"
                  fill
                  sizes="96px"
                  className="rounded-full border-4 border-white shadow-md object-cover"
                />
              </div>
              <h3 className="font-semibold text-xl text-white">
                Mohamed Hassan
              </h3>
              <p className="text-purple-400 text-sm mb-4">
                Chief Financial Officer
              </p>
              <p className="text-gray-300 italic text-sm">
                "{t('work.leadership.cfo_quote')}"
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-2 border border-gray-800">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image
                  src="/anoud-abdullah.jpg"
                  alt="Anoud Abdullah"
                  fill
                  sizes="96px"
                  className="rounded-full border-4 border-white shadow-md object-cover"
                />
              </div>
              <h3 className="font-semibold text-xl text-white">
                Anoud Abdullah
              </h3>
              <p className="text-purple-400 text-sm mb-4">Marketing Manager</p>
              <p className="text-gray-300 italic text-sm">
                "{t('work.leadership.marketing_quote')}"
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-2 border border-gray-800">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image
                  src="/abdo-hendy.jpg"
                  alt="Abdo Hendy"
                  fill
                  sizes="96px"
                  className="rounded-full border-4 border-white shadow-md object-cover"
                />
              </div>
              <h3 className="font-semibold text-xl text-white">
                Abdo Hendy
              </h3>
              <p className="text-purple-400 text-sm mb-4">
                Head of Media Department
              </p>
              <p className="text-gray-300 italic text-sm">
                "{t('work.leadership.media_quote')}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========= CTA ========= */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-cyan-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('work.cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {t('work.cta.subtitle')}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-purple-600 hover:bg-white/90 px-10 py-6 text-lg rounded-full transform hover:scale-105 transition-all duration-300 shadow-xl font-semibold"
          >
            <Link href="/contact" className="inline-flex items-center gap-3">
              {t('work.cta.button')} <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
