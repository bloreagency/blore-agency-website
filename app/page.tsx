import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Award, Lightbulb, Zap, Target, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Custom Professional Background */}
        <div className="absolute inset-0">
          <Image src="/images/hero-bg.png" alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-cyan-900/90"></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          {/* Logo */}
          <div className="mb-8 transform hover:scale-105 transition-transform duration-500">
            <div className="flex items-center justify-center mb-6">
              <Image
                src="/images/blore-logo-white.png"
                alt="Blore Agency Logo"
                width={120}
                height={120}
                className="drop-shadow-2xl animate-fade-in"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in-up">BLORE AGENCY</h1>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto rounded-full animate-fade-in-up"></div>
          </div>

          {/* Slogan */}
          <h2 className="text-2xl md:text-4xl font-light text-white/90 mb-8 animate-fade-in-up delay-200">
            Where Creativity Meets Technology
          </h2>

          {/* Intro */}
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-300">
            We're a forward-thinking creative digital agency that transforms bold ideas into extraordinary digital
            experiences. From innovative branding to cutting-edge AI-powered solutions, we craft stories that resonate
            and technologies that perform.
          </p>

          {/* CTA Button */}
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white px-10 py-6 text-lg rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 font-semibold animate-fade-in-up delay-400"
          >
            <Link href="/contact" className="inline-flex items-center gap-3">
              Let's Talk
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">What Makes Us Different</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine creative excellence with cutting-edge technology to deliver results that exceed expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/30">
                <Lightbulb className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation First</h3>
              <p className="text-gray-600 leading-relaxed">
                We stay ahead of trends and leverage the latest technologies, including AI-powered tools, to give your
                brand a competitive edge in the digital landscape.
              </p>
            </div>

            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-cyan-400/30">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Client-Centric</h3>
              <p className="text-gray-600 leading-relaxed">
                Your success is our priority. We work closely with you throughout every step of the process to ensure
                exceptional results that align with your vision.
              </p>
            </div>

            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/30">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Proven Results</h3>
              <p className="text-gray-600 leading-relaxed">
                Our portfolio speaks for itself. We've helped countless brands achieve their digital goals and grow
                their presence across multiple platforms.
              </p>
            </div>

            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-cyan-400/30">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fast Execution</h3>
              <p className="text-gray-600 leading-relaxed">
                We understand the importance of time in business. Our streamlined processes ensure quick turnaround
                without compromising on quality.
              </p>
            </div>

            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/30">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Strategic Focus</h3>
              <p className="text-gray-600 leading-relaxed">
                Every decision we make is data-driven and strategically aligned with your business objectives and market
                positioning.
              </p>
            </div>

            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-cyan-400/30">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Growth Focused</h3>
              <p className="text-gray-600 leading-relaxed">
                We don't just create beautiful designs – we build solutions that drive measurable business growth and
                long-term success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Services</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            From branding to AI-powered marketing, we offer comprehensive digital solutions that drive results.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              "Branding & Graphic Design",
              "Web Design & Development",
              "Mobile Applications",
              "Motion Graphics & Video Editing",
              "Social Media Marketing",
              "AI-Powered Marketing Tools",
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group hover:transform hover:scale-105"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                  {service}
                </h3>
              </div>
            ))}
          </div>

          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white px-8 py-6 text-lg rounded-full transform hover:scale-105 transition-all duration-300"
          >
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-cyan-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Brand?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and explore how we can help you achieve your digital goals.
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
