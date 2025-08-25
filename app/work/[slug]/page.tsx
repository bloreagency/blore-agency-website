import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug, projects } from "@/lib/projects";

/** ===== SEO ديناميكي ===== */
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
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
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return notFound();

  return (
    <main className="min-h-screen">
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
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              {project.fullDescription.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
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

          <aside className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Project Highlights
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>Category:</strong> {project.category}
              </li>
              {project.results && (
                <li>
                  <strong>Results:</strong> {project.results}
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
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
          {project.gallery.length === 0 ? (
            <p className="text-gray-600">Gallery will be added soon.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((src, idx) => (
                <div
                  key={idx}
                  className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200"
                >
                  <Image
                    src={src}
                    alt={`${project.title} image ${idx + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}
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
