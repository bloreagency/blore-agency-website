'use client'; // <-- هذا السطر ضروري لحل مشكلة Hydration

import Link from "next/link";
import { Button } from "../components/ui/button"; // تعديل المسار
import { ArrowRight, Users, Award, Lightbulb } from "lucide-react";
import dynamic from 'next/dynamic';

// استيراد ديناميكي للمكون مع تعطيل العرض على الخادم (يحل كل مشاكل Hydration)
const VantaBackground = dynamic(() => import('../components/VantaBackground'), { // تعديل المسار
  ssr: false,
});

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <VantaBackground>
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 animate-fade-in-up">BLORE AGENCY</h1>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto rounded-full animate-fade-in-up"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-white/90 mb-8 animate-fade-in-up delay-200">
            Where Creativity Meets Technology
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-300">
            We're a forward-thinking creative digital agency that transforms bold ideas into extraordinary digital
            experiences. From innovative branding to cutting-edge AI-powered solutions, we craft stories that resonate
            and technologies that perform.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white px-14 py-8 text-xl rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 font-semibold animate-fade-in-up delay-400"
          >
            <Link href="/contact" className="inline-flex items-center gap-3">
              Let's Talk
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </VantaBackground>

      {/* What Makes Us Different Section */}
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
                We stay ahead of trends and leverage the latest technologies to give your brand a competitive edge.
              </p>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-cyan-400/30">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Client-Centric</h3>
              <p className="text-gray-600 leading-relaxed">
                Your success is our priority. We work closely with you to ensure exceptional results that align with your vision.
              </p>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/30">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Proven Results</h3>
              <p className="text-gray-600 leading-relaxed">
                Our portfolio speaks for itself. We've helped countless brands achieve their digital goals.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
