import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import styles from "./work.module.css"; // CSS Module الخاص بالقسم

export default function WorkPage() {
  const projects = [
    { title: "Qatrat Al Nada Medical Services", category: "Medical Services Branding", description: "A comprehensive brand identity and digital presence for a leading home healthcare provider.", image: "/images/portfolio-qatrat-alnada.jpg", tags: ["Branding", "Healthcare", "Web Design"], results: "50% increase in inquiries" },
    { title: "Thiqa Medical Services", category: "Healthcare Solutions", description: "Development of a robust digital platform for Thiqa Medical Services.", image: "/images/portfolio-thiqa-medical.jpg", tags: ["Web Development", "Healthcare", "Platform"], results: "Increased bookings by 40%" },
    { title: "Blore Motion Graphics", category: "Motion Graphics & Animation", description: "Creation of engaging motion graphics for Blore Agency's promotional campaigns.", image: "/images/portfolio-blore-motion.png", tags: ["Motion Graphics", "Animation", "Promotion"], results: "Enhanced engagement by 35%" },
    { title: "TechStart Complete Rebrand", category: "Branding & Identity", description: "Complete brand identity system for an innovative tech startup.", image: "/images/portfolio-rebrand.png", tags: ["Branding", "Logo Design", "Digital Assets"], results: "300% brand recognition" },
    { title: "E-Commerce Platform Redesign", category: "Web Development", description: "Custom e-commerce website with advanced features and mobile optimization.", image: "/images/portfolio-ecommerce.png", tags: ["Web Development", "E-commerce", "UI/UX"], results: "150% increase in sales" },
    { title: "FitTrack Mobile App", category: "Mobile Application", description: "Comprehensive fitness tracking mobile app with intuitive navigation and social features.", image: "/images/portfolio-fitness-app.png", tags: ["Mobile App", "UI/UX", "Fitness"], results: "50K+ downloads" },
    { title: "Brand Motion Campaign", category: "Motion Graphics", description: "Dynamic motion graphics and animated content for social media campaigns.", image: "/images/portfolio-motion-graphics.png", tags: ["Motion Graphics", "Animation", "Video", "Social Media"], results: "2M+ video views" },
    { title: "Social Growth Strategy", category: "Social Media Marketing", description: "Comprehensive social media strategy and content creation that increased engagement.", image: "/images/portfolio-social-media.png", tags: ["Social Media", "Marketing", "Content Creation"], results: "400% increase in engagement" },
    { title: "AI Marketing Dashboard", category: "AI-Powered Tools", description: "Custom AI-powered marketing analytics dashboard with predictive insights.", image: "/images/portfolio-ai-dashboard.png", tags: ["AI Tools", "Analytics", "Dashboard", "Machine Learning"], results: "60% improvement in ROI" },
  ];

  const clientLogos = Array.from({ length: 13 }, (_, i) => ({
    src: `/images/client-logo-${i + 1}.png`,
    alt: `Client Logo ${i + 1}`,
  }));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-purple-600 to-cyan-500">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Our Work</h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Explore our portfolio of successful projects across various industries.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.title} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-gray-200">
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
                  <div className="text-sm text-purple-600 font-medium mb-2">{project.category}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed h-20">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-gradient-to-r from-purple-100 to-cyan-100 text-purple-700 text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Trusted Clients – Horizontal Marquee */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-20">Our Trusted Clients</h2>
        <div className={styles.logos} role="region" aria-label="Trusted clients logos">
          <div className={styles.logosTrack}>
            <div className={styles.logosSlide}>
              {clientLogos.map((logo, index) => (
                <img key={index} src={logo.src} alt={logo.alt} />
              ))}
            </div>
            <div className={styles.logosSlide} aria-hidden="true">
              {clientLogos.map((logo, index) => (
                <img key={index + clientLogos.length} src={logo.src} alt={logo.alt} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Leadership Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Leadership</h2>
            <p className="text-xl text-gray-600">
              The driving force behind our creative solutions and successful strategies.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image src="/hossam-amer.jpg" alt="Hossam Amer" fill sizes="96px" className="rounded-full border-4 border-white shadow-md object-cover" />
              </div>
              <h3 className="font-semibold text-xl text-gray-900">Hossam Amer</h3>
              <p className="text-purple-600 text-sm mb-4">Chief Executive Officer</p>
              <p className="text-gray-600 italic text-sm">
                "Our vision is to merge technology and creativity to build digital legacies for our clients."
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image src="/mohamed-hassan.jpg" alt="Mohamed Hassan" fill sizes="96px" className="rounded-full border-4 border-white shadow-md object-cover" />
              </div>
              <h3 className="font-semibold text-xl text-gray-900">Mohamed Hassan</h3>
              <p className="text-purple-600 text-sm mb-4">Chief Financial Officer</p>
              <p className="text-gray-600 italic text-sm">
                "Driving sustainable growth and financial excellence to empower our creative endeavors."
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image src="/anoud-abdullah.jpg" alt="Anoud Abdullah" fill sizes="96px" className="rounded-full border-4 border-white shadow-md object-cover" />
              </div>
              <h3 className="font-semibold text-xl text-gray-900">Anoud Abdullah</h3>
              <p className="text-purple-600 text-sm mb-4">Marketing Manager</p>
              <p className="text-gray-600 italic text-sm">
                "We craft compelling narratives that connect brands with their audiences in meaningful ways."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-cyan-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Brand?</h2>
          <p className="text-xl text-white/90 mb-8">
            Let's discuss your project and explore how we can help bring your vision to life.
          </p>
        <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-white/90 px-10 py-6 text-lg rounded-full transform hover:scale-105 transition-all duration-300 shadow-xl font-semibold">
            <Link href="/contact" className="inline-flex items-center gap-3">
              Start Your Project <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
