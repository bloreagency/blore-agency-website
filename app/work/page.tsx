import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/projects";

/** ===== SEO ===== */
export const metadata = {
  title: "Our Work | BLORE Agency",
  description:
    "Explore BLORE Agency’s portfolio: branding, web, motion graphics, social media, and AI-powered marketing across healthcare, tech, luxury and more.",
  keywords: [
    "BLORE Agency",
    "Our Work",
    "Portfolio",
    "Branding",
    "Web Design",
    "Motion Graphics",
    "Social Media",
    "AI Marketing",
    "Saudi Arabia",
    "Egypt",
    "Luxury Rebranding",
  ],
  alternates: { canonical: "https://www.bloreagency.com/work" },
  openGraph: {
    title: "Our Work | BLORE Agency",
    description:
      "A curated selection of branding, web, motion, media and AI projects by BLORE Agency.",
    url: "https://www.bloreagency.com/work",
    siteName: "BLORE Agency",
    type: "website",
    images: [
      {
        url: "/images/portfolio-blore-motion.png",
        width: 1200,
        height: 630,
        alt: "BLORE Agency portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Work | BLORE Agency",
    description:
      "Branding, web, motion, media and AI projects by BLORE Agency.",
    images: ["/images/portfolio-blore-motion.png"],
  },
};

export default function WorkPage() {
  const clientLogos = Array.from({ length: 12 }, (_, i) => ({
    src: `/images/client-logo-${i + 1}.png`,
    alt: `Client Logo ${i + 1}`,
  }));

  return (
    <div className="min-h-screen bg-white">
      {/* ========= Hero (RGB) ========= */}
      <section className="pt-32 pb-20 px-4 rgb-animated relative overflow-hidden">
        <div
          className="absolute inset-0 bg-black/30 pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our Work
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Explore our portfolio of successful projects across various
            industries.
          </p>
        </div>
      </section>

      {/* ========= Clients (Horizontal Marquee) ========= */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
            Our Trusted Clients
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

      {/* ========= Portfolio Grid (links to details) ========= */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-gray-200 block"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-purple-600 font-medium mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed h-20">
                    {project.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gradient-to-r from-purple-100 to-cyan-100 text-purple-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========= Leadership ========= */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Meet Our Leadership
            </h2>
            <p className="text-xl text-gray-600">
              The driving force behind our creative solutions and successful
              strategies.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image
                  src="/hossam-amer.jpg"
                  alt="Hossam Amer"
                  fill
                  sizes="96px"
                  className="rounded-full border-4 border-white shadow-md object-cover"
                />
              </div>
              <h3 className="font-semibold text-xl text-gray-900">
                Hossam Amer
              </h3>
              <p className="text-purple-600 text-sm mb-4">
                Chief Executive Officer
              </p>
              <p className="text-gray-600 italic text-sm">
                "Our vision is to merge technology and creativity to build
                digital legacies for our clients."
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image
                  src="/mohamed-hassan.jpg"
                  alt="Mohamed Hassan"
                  fill
                  sizes="96px"
                  className="rounded-full border-4 border-white shadow-md object-cover"
                />
              </div>
              <h3 className="font-semibold text-xl text-gray-900">
                Mohamed Hassan
              </h3>
              <p className="text-purple-600 text-sm mb-4">
                Chief Financial Officer
              </p>
              <p className="text-gray-600 italic text-sm">
                "Driving sustainable growth and financial excellence to empower
                our creative endeavors."
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image
                  src="/anoud-abdullah.jpg"
                  alt="Anoud Abdullah"
                  fill
                  sizes="96px"
                  className="rounded-full border-4 border-white shadow-md object-cover"
                />
              </div>
              <h3 className="font-semibold text-xl text-gray-900">
                Anoud Abdullah
              </h3>
              <p className="text-purple-600 text-sm mb-4">Marketing Manager</p>
              <p className="text-gray-600 italic text-sm">
                "We craft compelling narratives that connect brands with their
                audiences in meaningful ways."
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image
                  src="/abdo-hendy.jpg"
                  alt="Abdo Hendy"
                  fill
                  sizes="96px"
                  className="rounded-full border-4 border-white shadow-md object-cover"
                />
              </div>
              <h3 className="font-semibold text-xl text-gray-900">
                Abdo Hendy
              </h3>
              <p className="text-purple-600 text-sm mb-4">
                Head of Media Department
              </p>
              <p className="text-gray-600 italic text-sm">
                "Leading media innovation with creativity and impactful
                storytelling."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========= CTA ========= */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-cyan-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Brand?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Let's discuss your project and explore how we can help bring your
            vision to life.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-purple-600 hover:bg-white/90 px-10 py-6 text-lg rounded-full transform hover:scale-105 transition-all duration-300 shadow-xl font-semibold"
          >
            <Link href="/contact" className="inline-flex items-center gap-3">
              Start Your Project <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
