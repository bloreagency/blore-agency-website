import Image from "next/image"
import { ExternalLink, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function WorkPage() {
  const projects = [
    {
      title: "TechStart Complete Rebrand",
      category: "Branding & Identity",
      description:
        "Complete brand identity system for an innovative tech startup, including logo design, brand guidelines, and comprehensive digital asset library.",
      image: "/images/portfolio-rebrand.png", // تم التحديث
      tags: ["Branding", "Logo Design", "Brand Guidelines", "Digital Assets"],
      results: "300% increase in brand recognition",
    },
    {
      title: "E-Commerce Platform Redesign",
      category: "Web Development",
      description:
        "Custom e-commerce website with advanced features, mobile optimization, and seamless user experience that increased conversions significantly.",
      image: "/images/portfolio-ecommerce.png", // تم التحديث
      tags: ["Web Development", "E-commerce", "UI/UX", "Mobile Optimization"],
      results: "150% increase in online sales",
    },
    {
      title: "FitTrack Mobile App",
      category: "Mobile Application",
      description:
        "Comprehensive fitness tracking mobile app with intuitive navigation, social features, and engaging user interface design.",
      image: "/images/portfolio-fitness-app.png", // تم التحديث
      tags: ["Mobile App", "UI/UX", "Fitness", "Social Features"],
      results: "50K+ downloads in first month",
    },
    {
      title: "Brand Motion Campaign",
      category: "Motion Graphics",
      description:
        "Dynamic motion graphics and animated content for social media campaigns and brand storytelling across multiple platforms.",
      image: "/images/portfolio-motion-graphics.png", // تم التحديث
      tags: ["Motion Graphics", "Animation", "Video", "Social Media"],
      results: "2M+ video views across platforms",
    },
    {
      title: "Social Growth Strategy",
      category: "Social Media Marketing",
      description:
        "Comprehensive social media strategy and content creation that increased engagement and built a strong community presence.",
      image: "/images/portfolio-social-media.png", // تم التحديث
      tags: ["Social Media", "Marketing", "Content Creation", "Community"],
      results: "400% increase in engagement",
    },
    {
      title: "AI Marketing Dashboard",
      category: "AI-Powered Tools",
      description:
        "Custom AI-powered marketing analytics dashboard with predictive insights, automated reporting, and machine learning capabilities.",
      image: "/images/portfolio-ai-dashboard.png", // تم التحديث
      tags: ["AI Tools", "Analytics", "Dashboard", "Machine Learning"],
      results: "60% improvement in campaign ROI",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-purple-600 to-cyan-500">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">Our Work</h1>
          <p className="text-xl text-white/90 leading-relaxed animate-fade-in-up delay-200">
            Explore our portfolio of successful projects across various industries. Each project represents our
            commitment to excellence, innovation, and delivering results that exceed expectations and drive business
            growth.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-gray-200"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                      <ExternalLink className="w-5 h-5 text-gray-700" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.results}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-sm text-purple-600 font-medium mb-2">{project.category}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-gradient-to-r from-purple-100 to-cyan-100 text-purple-700 text-sm rounded-full"
                      >
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

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Impact</h2>
            <p className="text-xl text-gray-600">
              Numbers that showcase our commitment to delivering exceptional results and driving business growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-white p-8 rounded-2xl shadow-sm">
              <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text mb-2">
                150+
              </div>
              <div className="text-gray-600 font-medium">Projects Completed</div>
            </div>
            <div className="text-center bg-white p-8 rounded-2xl shadow-sm">
              <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text mb-2">
                98%
              </div>
              <div className="text-gray-600 font-medium">Client Satisfaction</div>
            </div>
            <div className="text-center bg-white p-8 rounded-2xl shadow-sm">
              <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text mb-2">
                50+
              </div>
              <div className="text-gray-600 font-medium">Happy Clients</div>
            </div>
            <div className="text-center bg-white p-8 rounded-2xl shadow-sm">
              <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text mb-2">
                5+
              </div>
              <div className="text-gray-600 font-medium">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it - hear from some of our satisfied clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-cyan-50 p-8 rounded-2xl border border-purple-100">
              <p className="text-gray-700 mb-6 italic">
                "Blore Agency transformed our entire digital presence. Their creative approach and technical expertise
                helped us achieve a 300% increase in online engagement."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  JS
                </div>
                <div>
                  <div className="font-semibold text-gray-900">John Smith</div>
                  <div className="text-gray-600 text-sm">CEO, TechStart Inc.</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-purple-50 p-8 rounded-2xl border border-cyan-100">
              <p className="text-gray-700 mb-6 italic">
                "The team at Blore Agency delivered beyond our expectations. Their AI-powered marketing tools increased
                our ROI by 60% in just three months."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  MJ
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Maria Johnson</div>
                  <div className="text-gray-600 text-sm">Marketing Director, GrowthCorp</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-cyan-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Create Something Amazing?</h2>
          <p className="text-xl text-white/90 mb-8">
            Let's discuss your project and explore how we can help bring your vision to life with measurable results.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-purple-600 hover:bg-white/90 px-10 py-6 text-lg rounded-full transform hover:scale-105 transition-all duration-300 shadow-xl font-semibold"
          >
            <Link href="/contact" className="inline-flex items-center gap-3">
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}