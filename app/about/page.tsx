import { Heart, Eye, Users, Target, Zap, Shield, CheckCircle } from "lucide-react";
import Image from "next/image";

/** ===== SEO (App Router) ===== */
export const metadata = {
  title: "About Us | BLORE Agency",
  description:
    "Learn about BLORE Agency — where creativity meets technology. We craft branding, web, media, and AI solutions for brands across Egypt & KSA.",
  alternates: { canonical: "https://www.bloreagency.com/about" },
  openGraph: {
    title: "About Us | BLORE Agency",
    description:
      "Creativity + Technology. Discover BLORE Agency’s story, mission, values, and leadership team.",
    url: "https://www.bloreagency.com/about",
    siteName: "BLORE Agency",
    type: "website",
    images: [{ url: "/images/portfolio-blore-motion.png", width: 1200, height: 630, alt: "BLORE Agency Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | BLORE Agency",
    description: "Discover our story, mission, values, and leadership team.",
    images: ["/images/portfolio-blore-motion.png"],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section (RGB + overlay) */}
      <section className="pt-32 pb-20 px-4 rgb-animated relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">About Blore Agency</h1>
          <p className="text-xl text-white/90 leading-relaxed">
            We're not just another digital agency. We're creative innovators, strategic thinkers, and technology
            enthusiasts who believe that great design and smart solutions can transform businesses and create lasting
            impact.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Who We Are</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Founded on the principle that creativity and technology should work in perfect harmony, Blore Agency has
                established itself as a leading creative digital agency. We're a passionate team of designers,
                developers, strategists, and innovators who live and breathe digital excellence.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Our diverse expertise spans from traditional branding and graphic design to cutting-edge AI-powered
                marketing tools. We don't just follow trends – we set them, constantly pushing the boundaries of what's
                possible in the digital realm.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Every project we undertake is an opportunity to create something extraordinary, something that not only
                meets our clients' objectives but exceeds their wildest expectations and drives measurable business
                growth.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">150+ Projects Completed</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">98% Client Satisfaction</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">5+ Years Experience</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">24/7 Support</span>
                </div>
              </div>
            </div>

            <div className="relative w-full h-96">
              <Image
                src="/images/about-us.png"      // تأكد من وجود الصورة
                alt="About Blore Agency"
                fill
                className="object-cover rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Stand For */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What We Stand For</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our core values guide everything we do and shape how we work with our clients and each other.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Passion</h3>
              <p className="text-gray-600">
                We pour our hearts into every project, treating your vision as our own and your success as our ultimate
                mission and driving force.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Vision</h3>
              <p className="text-gray-600">
                We see beyond the present, anticipating future trends and technologies to keep your brand ahead of the
                curve and competitive.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Precision</h3>
              <p className="text-gray-600">
                Every pixel, every line of code, every strategy is crafted with meticulous attention to detail and
                strategic purpose.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                We embrace new technologies and creative approaches, constantly pushing boundaries to deliver
                breakthrough solutions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Collaboration</h3>
              <p className="text-gray-600">
                We believe the best results come from true partnership, working closely with clients as an extension of
                their team.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Integrity</h3>
              <p className="text-gray-600">
                We build lasting relationships through honest communication, transparent processes, and reliable
                delivery on our promises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership (Team) */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Leadership</h2>
            <p className="text-gray-600">
              The team that drives our creative strategies and technical excellence.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { n: "Hossam Amer", r: "Chief Executive Officer", img: "/hossam-amer.jpg" },
              { n: "Mohamed Hassan", r: "Chief Financial Officer", img: "/mohamed-hassan.jpg" },
              { n: "Anoud Abdullah", r: "Marketing Manager", img: "/anoud-abdullah.jpg" },
              { n: "Abdo Hendy", r: "Head of Media Department", img: "/abdo-hendy.jpg" },
            ].map((m) => (
              <div key={m.n} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={m.img}
                    alt={m.n}
                    fill
                    sizes="96px"
                    className="rounded-full object-cover border-4 border-white shadow"
                  />
                </div>
                <h3 className="font-semibold text-xl text-gray-900">{m.n}</h3>
                <p className="text-purple-600 text-sm mb-3">{m.r}</p>
                <p className="text-gray-600 text-sm italic">
                  “We craft meaningful experiences that connect brands and audiences.”
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What Makes Us Different</h2>
            <p className="text-xl text-gray-600">
              Here's what sets us apart in the competitive digital landscape.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-50 to-cyan-50 p-8 rounded-2xl border border-purple-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Comprehensive Expertise</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                From traditional branding to AI-powered marketing tools, we offer a complete suite of services under one
                roof. This means consistent quality, seamless integration, and a unified vision across all your digital
                touchpoints.
              </p>
            </div>

            <div className="bg-gradient-to-r from-cyan-50 to-purple-50 p-8 rounded-2xl border border-cyan-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Future-Ready Solutions</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                We don't just solve today's problems – we anticipate tomorrow's opportunities. Our team stays at the
                forefront of emerging technologies to keep your brand competitive.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-cyan-50 p-8 rounded-2xl border border-purple-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Proven Track Record</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our portfolio showcases successful projects across diverse industries, consistently delivering measurable
                growth and impact.
              </p>
            </div>

            <div className="bg-gradient-to-r from-cyan-50 to-purple-50 p-8 rounded-2xl border border-cyan-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Personalized Approach</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Every business is unique. We tailor strategies to your goals, market, and audience for the best possible
                outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
