'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Award, Lightbulb, Quote } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from 'react'; // 👈 تم إضافة هذه المكتبات

// ✅ Placeholder Component: يُعرض أثناء تحميل VantaJS للحفاظ على الـ layout
const VantaPlaceholder = ({ children }: { children: React.ReactNode }) => (
  // استخدمنا min-h-screen و padding لإعادة إنشاء مساحة الـ Hero بدقة
  <div className="relative w-full min-h-screen bg-gray-900 flex items-center justify-center pt-20 pb-20"> 
    {children}
  </div>
);

// ✅ استيراد مكوّن الخلفية باستخدام alias @/ (يتطلب tsconfig بها baseUrl + paths)
const VantaBackground = dynamic(() => import("@/components/VantaBackground"), {
  ssr: false,
  // استخدام الـ Placeholder للحفاظ على الـ layout أثناء التحميل
  loading: () => <VantaPlaceholder><div className="relative z-10 text-center max-w-5xl mx-auto"></div></VantaPlaceholder>,
});

export default function HomePage() {
  const [showVanta, setShowVanta] = useState(false); // 👈 الحالة للتحكم في ظهور Vanta

  useEffect(() => {
    // تشغيل تحميل Vanta بعد فترة قصيرة (500ms) للسماح للصفحة بالتحميل أولاً
    const timer = setTimeout(() => {
      setShowVanta(true);
    }, 500);

    return () => clearTimeout(timer); // تنظيف المؤقت عند مغادرة المكون
  }, []);

  // فصل محتوى الـ Hero لجعله متوفرًا داخل VantaBackground و VantaPlaceholder
  const HeroContent = (
    <div className="relative z-10 text-center max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 animate-fade-in-up">
          BLORE AGENCY
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full animate-fade-in-up"></div>
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
        className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-14 py-8 text-xl rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 font-semibold animate-fade-in-up delay-400"
      >
        <Link href="/contact" className="inline-flex items-center gap-3">
          Let's Talk
          <ArrowRight className="w-5 h-5" />
        </Link>
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {/* 👈 سيظهر VantaBackground فقط بعد تأخير 500ms */}
      {showVanta ? (
        <VantaBackground>
          {HeroContent}
        </VantaBackground>
      ) : (
        // 👈 سيظهر Placeholder في البداية للحفاظ على التصميم
        <VantaPlaceholder>
          {HeroContent}
        </VantaPlaceholder>
      )}

      {/* What Makes Us Different Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up delay-500">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">What Makes Us Different</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine creative excellence with cutting-edge technology to deliver results that exceed expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300 animate-fade-in-up delay-600">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/30">
                <Lightbulb className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation First</h3>
              <p className="text-gray-600 leading-relaxed">
                We stay ahead of trends and leverage the latest technologies to give your brand a competitive edge.
              </p>
            </div>

            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300 animate-fade-in-up delay-700">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-cyan-400/30">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Client-Centric</h3>
              <p className="text-gray-600 leading-relaxed">
                Your success is our priority. We work closely with you to ensure exceptional results that align with your vision.
              </p>
            </div>

            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300 animate-fade-in-up delay-800">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/30">
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

      {/* Our Services Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up delay-900">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer a full suite of digital services designed to elevate your brand and grow your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1: Digital Marketing */}
            <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-1000">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-trending-up"
                >
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Digital Marketing</h3>
              <p className="text-gray-600 leading-relaxed">
                From SEO and content strategy to social media and paid ads, we build campaigns that convert and drive growth.
              </p>
            </div>

            {/* Service Card 2: Web & Mobile Development */}
            <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-1100">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-code"
                >
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Web & Mobile Development</h3>
              <p className="text-gray-600 leading-relaxed">
                We craft custom, scalable and secure websites and mobile applications using modern technologies.
              </p>
            </div>

            {/* Service Card 3: UI/UX & Graphic Design */}
            <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-1200">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-pen-tool"
                >
                  <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                  <path d="M18.8 1.2a2.42 2.42 0 0 0-3.44 0L9 8.6"></path>
                  <path d="M12 19l-7-7-3 3 7 7-3-3z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">UI/UX & Graphic Design</h3>
              <p className="text-gray-600 leading-relaxed">
                From brand identity to intuitive user interfaces, we bring your vision to life with stunning visuals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - NEW & Improved */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 animate-fade-in-up delay-100">
            Hear directly from the businesses we've helped grow.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial Card 1 */}
            <div className="relative p-8 bg-gray-50 rounded-xl shadow-lg border-b-4 border-purple-500 overflow-hidden 
                          group hover:shadow-2xl hover:border-r-4 hover:border-b-0 transition-all duration-500 
                          transform hover:scale-105 animate-fade-in-up delay-200">
              <Quote className="absolute top-4 left-4 w-10 h-10 text-purple-200 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="text-lg md:text-xl italic text-gray-700 leading-relaxed mb-6 mt-8">
                "Working with Blore Agency was a game-changer for our brand. Their blend of creativity and technical expertise brought our vision to life. The new website looks incredible and our conversion rates have skyrocketed!"
              </p>
              <div className="font-semibold text-gray-900">- Ahmed, CEO of Company X</div>
            </div>

            {/* Testimonial Card 2 */}
            <div className="relative p-8 bg-gray-50 rounded-xl shadow-lg border-b-4 border-purple-500 overflow-hidden 
                          group hover:shadow-2xl hover:border-r-4 hover:border-b-0 transition-all duration-500 
                          transform hover:scale-105 animate-fade-in-up delay-300">
              <Quote className="absolute top-4 left-4 w-10 h-10 text-purple-200 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="text-lg md:text-xl italic text-gray-700 leading-relaxed mb-6 mt-8">
                "We were looking for a team that could understand our vision and execute it flawlessly. Blore Agency did just that, and their strategic insights were invaluable. Highly recommend!"
              </p>
              <div className="font-semibold text-gray-900">- Fatma, Marketing Manager</div>
            </div>

            {/* Testimonial Card 3 (New) */}
            <div className="relative p-8 bg-gray-50 rounded-xl shadow-lg border-b-4 border-purple-500 overflow-hidden 
                          group hover:shadow-2xl hover:border-r-4 hover:border-b-0 transition-all duration-500 
                          transform hover:scale-105 animate-fade-in-up delay-400">
              <Quote className="absolute top-4 left-4 w-10 h-10 text-purple-200 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="text-lg md:text-xl italic text-gray-700 leading-relaxed mb-6 mt-8">
                "Blore Agency's design team exceeded our expectations. They captured the essence of our brand perfectly, delivering stunning visuals and a user experience that truly stands out."
              </p>
              <div className="font-semibold text-gray-900">- Khaled, Founder of Z Solutions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog/Insights Section - NEW & TRENDY */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Insights & Articles</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay up-to-date with the latest trends in digital marketing, design, and web development.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Article Card 1 */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden group 
                          transform hover:scale-105 transition-all duration-300 animate-fade-in-up delay-100">
              <div className="relative w-full h-48 bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center p-4"> {/* Added padding */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80" /* Increased size */
                  height="80" /* Increased size */
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-trending-up"
                >
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">5 SEO Trends to Watch in 2025</h3>
                <p className="text-gray-600 leading-relaxed text-sm mb-4">
                  Learn how to optimize your website for the future with these essential SEO strategies.
                </p>
              </div>
            </div>
            {/* Article Card 2 */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden group 
                          transform hover:scale-105 transition-all duration-300 animate-fade-in-up delay-200">
              <div className="relative w-full h-48 bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center p-4"> {/* Added padding */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80" /* Increased size */
                  height="80" /* Increased size */
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-book"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20h-4"></path>
                  <line x1="16" y1="2" x2="16" y2="22"></line>
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">The Art of Brand Storytelling</h3>
                <p className="text-gray-600 leading-relaxed text-sm mb-4">
                  Discover how to craft a compelling brand narrative that resonates with your audience.
                </p>
              </div>
            </div>
            {/* Article Card 3 */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden group 
                          transform hover:scale-105 transition-all duration-300 animate-fade-in-up delay-300">
              <div className="relative w-full h-48 bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center p-4"> {/* Added padding */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80" /* Increased size */
                  height="80" /* Increased size */
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-shopping-cart"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.5 11h11.4l2.5-7h-11.4"></path>
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">Building a Scalable E-commerce Store</h3>
                <p className="text-gray-600 leading-relaxed text-sm mb-4">
                  Our guide to building an e-commerce platform that grows with your business.
                </p>
              </div>
            </div>
            {/* Article Card 4 */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden group 
                          transform hover:scale-105 transition-all duration-300 animate-fade-in-up delay-400">
              <div className="relative w-full h-48 bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center p-4"> {/* Added padding */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80" /* Increased size */
                  height="80" /* Increased size */
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-code"
                >
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">Web Development Trends in 2025</h3>
                <p className="text-gray-600 leading-relaxed text-sm mb-4">
                  A look into the future of web development and the technologies shaping the industry.
                </p>
              </div>
            </div>
            {/* Article Card 5 */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden group 
                          transform hover:scale-105 transition-all duration-300 animate-fade-in-up delay-500">
              <div className="relative w-full h-48 bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center p-4"> {/* Added padding */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80" /* Increased size */
                  height="80" /* Increased size */
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-cpu"
                >
                  <rect x="5" y="5" width="14" height="14" rx="2" ry="2"></rect>
                  <path d="M9 1v2"></path>
                  <path d="M15 1v2"></path>
                  <path d="M9 21v2"></path>
                  <path d="M15 21v2"></path>
                  <path d="M1 9h2"></path>
                  <path d="M1 15h2"></path>
                  <path d="M21 9h2"></path>
                  <path d="M21 15h2"></path>
                  <path d="M12 11h-1"></path>
                  <path d="M12 13h-1"></path>
                  <path d="M12 15h-1"></path>
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">AI in Creative Workflows</h3>
                <p className="text-gray-600 leading-relaxed text-sm mb-4">
                  Explore how AI is revolutionizing design and creative processes for agencies.
                </p>
              </div>
            </div>
            {/* Article Card 6 */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden group 
                          transform hover:scale-105 transition-all duration-300 animate-fade-in-up delay-600">
              <div className="relative w-full h-48 bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center p-4"> {/* Added padding */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80" /* Increased size */
                  height="80" /* Increased size */
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-share-2"
                >
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">Effective Social Media Marketing</h3>
                <p className="text-gray-600 leading-relaxed text-sm mb-4">
                  Strategies to boost your brand's presence and engagement on social media platforms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* ... ضع بقية الأقسام هنا عند الحاجة ... */}
    </div>
  );
}