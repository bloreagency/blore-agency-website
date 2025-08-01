'use client';

import React, { useEffect, useRef } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Award, Lightbulb, Zap, Target, TrendingUp } from "lucide-react";
import * as THREE from 'three';
// The import below needs to be corrected if it's not a default export or if the path is wrong.
// Assuming 'vanta/dist/vanta.net.min.js' exports a function.
import NET from 'vanta/dist/vanta.net.min.js';

export default function HomePage() {
  const vantaRef = useRef(null);

  useEffect(() => {
    let vantaEffect: any = null;
    if (vantaRef.current) {
      vantaEffect = NET({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xC66DD9,
        backgroundColor: 0x362A51,
        points: 7.00,
        maxDistance: 20.00,
        spacing: 25.00
      });
    }
    // دالة التنظيف للتأكد من إيقاف الأنيميشن عند مغادرة الصفحة
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []); // القوسان الفارغان يعنيان أن هذا الكود سيعمل مرة واحدة فقط عند تحميل الصفحة

  return (
    <div className="min-h-screen">
      {/* Vanta.js Background is now the Hero Section itself */}
      <section ref={vantaRef} className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        
        {/* Hero Section Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 animate-fade-in-up">BLORE AGENCY</h1>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto rounded-full animate-fade-in-up"></div>
          </div>

          <h2 className="text-3xl md:text-5xl font-light text-white/90 mb-8 animate-fade-in-up delay-200">
            Always Here Always Assist You
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
      </section>

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
  );
}