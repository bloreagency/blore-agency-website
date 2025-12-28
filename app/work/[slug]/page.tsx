import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects";

/** ===== SEO ديناميكي ===== */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found | BLORE Agency" };

  const url = `https://www.bloreagency.com/work/${project.slug}`;
  const ogImage = project.image || "/images/portfolio-blore-motion.png";

  return {
    title: `${project.title} | BLORE Agency`,
    description: project.shortDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.title} | BLORE Agency`,
      description: project.shortDescription,
      url,
      siteName: "BLORE Agency",
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | BLORE Agency`,
      description: project.shortDescription,
      images: [ogImage],
    },
  };
}

/** (اختياري) توليد مسبق للصفحات */
export async function generateStaticParams() {
  const slugs = getAllProjectSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  return (
    <main className="min-h-screen bg-gray-950">
      {/* Hero — RGB + overlay */}
      <section className="pt-32 pb-16 px-4 rgb-animated relative overflow-hidden">
        <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {project.title}
          </h1>
          <p className="text-white/90">{project.shortDescription}</p>
          <div className="mt-4">
            <span className="inline-block text-sm px-3 py-1 rounded-full bg-white/15 text-white border border-white/20">
              {project.category}
            </span>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-12 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              {project.fullDescription && project.fullDescription.length > 0 ? (
                project.fullDescription.map((p, i) => (
                  <p key={i}>{p}</p>
                ))
              ) : (
                <p>{project.description}</p>
              )}
            </div>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 text-purple-300 text-sm rounded-full border border-purple-700/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <aside className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-6 rounded-2xl border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-3">
              Project Highlights
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <strong>Category:</strong> {project.category}
              </li>
              {project.results && (
                <li>
                  <strong>Results:</strong>
                  <ul className="mt-2 space-y-1">
                    {Object.entries(project.results).map(([key, value]) => (
                      <li key={key} className="text-sm">
                        {key}: {value}
                      </li>
                    ))}
                  </ul>
                </li>
              )}
            </ul>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold hover:from-purple-700 hover:to-cyan-600 transition"
              >
                Start a Similar Project
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Gallery</h2>
          {/* Gallery */}
          <div className="grid md:grid-cols-2 gap-6">
            {(project.gallery || project.images || []).map((img, idx) => (
              <div key={idx} className="relative aspect-video rounded-xl overflow-hidden">
                <Image
                  src={img}
                  alt={`${project.title} image ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="prose prose-invert max-w-none">
            {project.fullDescription && project.fullDescription.length > 0 ? (
              project.fullDescription.map((para, idx) => (
                <p key={idx} className="text-gray-300 text-lg leading-relaxed mb-4">
                  {para}
                </p>
              ))
            ) : (
              <p className="text-gray-300 text-lg leading-relaxed">
                {project.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-cyan-500">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Have a project in mind?
          </h3>
          <p className="text-white/90 mb-6">
            Let’s build something remarkable — from concept to launch.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 rounded-full bg-white text-purple-700 font-semibold hover:bg-white/90 transition"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
