'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Award, Lightbulb, Quote, Sparkles, Zap, Rocket, TrendingUp, Code, Palette } from "lucide-react";
import dynamic from "next/dynamic";
import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/animations/ScrollReveal";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import { motion } from "framer-motion";

// Dynamic imports for performance
const Web3Globe = dynamic(() => import("@/components/Web3Globe"), {
  ssr: false,
});

const InteractiveShapes = dynamic(() => import("@/components/3d/InteractiveShapes"), {
  ssr: false,
});

const FloatingElements = dynamic(() => import("@/components/3d/FloatingElements"), {
  ssr: false,
});

const ParticleBackground = dynamic(() => import("@/components/3d/ParticleBackground"), {
  ssr: false,
});

const FloatingLogo = dynamic(() => import("@/components/3d/FloatingLogo"), {
  ssr: false,
});

const GlassmorphicCard = dynamic(() => import("@/components/3d/GlassmorphicCard"), {
  ssr: false,
});

const ScrollingGlobe = dynamic(() => import("@/components/3d/ScrollingGlobe"), {
  ssr: false,
});


const translations = {
  en: {
    hero: {
      title: "Build an AI Driven Future for Your Business",
      subtitle: "Bring custom AI practice to any of your business processes, on premises.",
      cta: "Get it for your business",
      ctaSecondary: "Discover more"
    },
    future: {
      badge: "Web3-Ready Software Studio",
      title: "Engineered for the Next Internet",
      subtitle: "From AI-native products to Web3 experiences, we architect systems that are ready for the next decade of software.",
      pillars: {
        ai: {
          title: "AI-Native Products",
          desc: "Design and ship products with AI at the core – from copilots to fully autonomous workflows."
        },
        cloud: {
          title: "Scalable Cloud",
          desc: "Modern cloud architectures built on microservices, serverless, and event-driven systems."
        },
        web3: {
          title: "Web3 & Smart Contracts",
          desc: "User-first dApps, tokenized experiences, and secure smart contracts audited and production-ready."
        }
      }
    },
    features: {
      title: "What Makes Us Different",
      subtitle: "We combine creative excellence with cutting-edge technology to deliver results that exceed expectations.",
      innovation: {
        title: "Innovation First",
        desc: "We stay ahead of trends and leverage the latest technologies to give your brand a competitive edge."
      },
      client: {
        title: "Client-Centric",
        desc: "Your success is our priority. We work closely with you to ensure exceptional results that align with your vision."
      },
      results: {
        title: "Proven Results",
        desc: "Our portfolio speaks for itself. We've helped countless brands achieve their digital goals."
      }
    },
    services: {
      title: "Our Services",
      subtitle: "We offer a full suite of digital services designed to elevate your brand and grow your business."
    },
    testimonials: {
      title: "What Our Clients Say",
      subtitle: "Hear directly from the businesses we've helped grow."
    }
  },
  ar: {
    hero: {
      title: "ابني مستقبلًا مدعومًا بالذكاء الاصطناعي لعملك",
      subtitle: "اجلب ممارسات الذكاء الاصطناعي المخصصة إلى أي من عمليات عملك، على الموقع.",
      cta: "احصل عليه لعملك",
      ctaSecondary: "اكتشف المزيد"
    },
    future: {
      badge: "استوديو برمجيات جاهز لعالم Web3",
      title: "هندسة رقمية جاهزة لمستقبل الإنترنت",
      subtitle: "من المنتجات المعتمدة على الذكاء الاصطناعي إلى تجارب Web3، نصمم أنظمة جاهزة للعقد القادم من البرمجيات.",
      pillars: {
        ai: {
          title: "منتجات مدعومة بالذكاء الاصطناعي",
          desc: "تصميم وتطوير منتجات يكون الذكاء الاصطناعي في قلبها – من المساعدين إلى الأتمتة الكاملة للعمليات."
        },
        cloud: {
          title: "سحابة قابلة للتوسع",
          desc: "هياكل سحابية حديثة تعتمد على الخدمات المصغّرة، والـ Serverless، والأنظمة المعتمدة على الأحداث."
        },
        web3: {
          title: "Web3 والعقود الذكية",
          desc: "تجارب لامركزية، وتوكنات رقمية، وعقود ذكية آمنة جاهزة للإطلاق في بيئات إنتاج حقيقية."
        }
      }
    },
    features: {
      title: "ما يميزنا",
      subtitle: "نجمع بين التميز الإبداعي والتكنولوجيا المتطورة لتقديم نتائج تتجاوز التوقعات.",
      innovation: {
        title: "الابتكار أولاً",
        desc: "نبقى في المقدمة ونستفيد من أحدث التقنيات لمنح علامتك التجارية ميزة تنافسية."
      },
      client: {
        title: "العميل في المركز",
        desc: "نجاحك هو أولويتنا. نعمل معك عن كثب لضمان نتائج استثنائية تتماشى مع رؤيتك."
      },
      results: {
        title: "نتائج مثبتة",
        desc: "محفظتنا تتحدث عن نفسها. لقد ساعدنا عددًا لا يحصى من العلامات التجارية على تحقيق أهدافها الرقمية."
      }
    },
    services: {
      title: "خدماتنا",
      subtitle: "نقدم مجموعة كاملة من الخدمات الرقمية المصممة لرفع علامتك التجارية ونمو عملك."
    },
    testimonials: {
      title: "ماذا يقول عملاؤنا",
      subtitle: "استمع مباشرة من الشركات التي ساعدناها على النمو."
    }
  }
};

export default function HomePage() {
  const { language } = useLanguage();
  const t = translations[language];
  const isRTL = language === 'ar';

  return (
    <div className="min-h-screen">
      {/* PREMIUM HERO SECTION - World-Class Design */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.15),transparent_50%)]"></div>
        </div>

        {/* 3D Particle Background */}
        <div className="absolute inset-0 z-0">
          <ParticleBackground />
        </div>

        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, 30, 0],
              x: [0, -20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 w-full min-h-screen flex items-center py-20">
          <div className="w-full max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-center relative">

              {/* Text Content */}
              <div className={`text-left rtl:text-right z-20 ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
                {/* Premium Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-8"
                >
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-semibold text-purple-300 uppercase tracking-wider">
                    {isRTL ? "وكالة رقمية رائدة" : "Leading Digital Agency"}
                  </span>
                </motion.div>

                {/* Main Heading with Gradient */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
                >
                  <span className="block bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                    {isRTL ? "نصنع" : "Crafting"}
                  </span>
                  <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mt-2">
                    {isRTL ? "التجارب الرقمية" : "Digital"}
                  </span>
                  <span className="block text-white mt-2">
                    {isRTL ? "المستقبلية" : "Experiences"}
                  </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-xl"
                >
                  {isRTL
                    ? "نحول أفكارك الجريئة إلى تجارب رقمية استثنائية تدفع النمو وتحقق النجاح"
                    : "Transforming bold ideas into extraordinary digital experiences that drive growth and deliver success"
                  }
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 mb-12"
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/contact">
                      <Button
                        size="lg"
                        className="group relative px-8 py-6 text-base font-semibold bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 overflow-hidden w-full sm:w-auto"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                          {isRTL ? "ابدأ مشروعك" : "Start Your Project"}
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      </Button>
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/work">
                      <Button
                        size="lg"
                        variant="outline"
                        className="group px-8 py-6 text-base font-semibold border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 rounded-2xl backdrop-blur-sm transition-all duration-300 w-full sm:w-auto"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <Zap className="w-5 h-5" />
                          {isRTL ? "شاهد أعمالنا" : "View Our Work"}
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="grid grid-cols-3 gap-6"
                >
                  {[
                    { number: "150+", label: isRTL ? "مشروع" : "Projects" },
                    { number: "50+", label: isRTL ? "عميل" : "Clients" },
                    { number: "5+", label: isRTL ? "سنوات" : "Years" },
                  ].map((stat, index) => (
                    <div key={index} className="text-center lg:text-left rtl:lg:text-right">
                      <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        {stat.number}
                      </div>
                      <div className="text-xs md:text-sm text-gray-400 mt-1 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Scrolling 3D Globe - Animates with scroll */}
              <ScrollingGlobe isRTL={isRTL} />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-sm text-gray-400 uppercase tracking-wider">
              {isRTL ? "تصفح" : "Scroll"}
            </span>
            <div className="w-6 h-10 border-2 border-purple-500/50 rounded-full flex justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-purple-400 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* What Makes Us Different Section */}
      <section className="py-24 px-4 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-cyan-50/50 dark:from-purple-900/10 dark:via-transparent dark:to-cyan-900/10"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal direction="up" delay={0.2}>
            <div className="text-center mb-20">
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white mb-8"
              >
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                  {t.features.title}
                </span>
              </motion.h2>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {t.features.subtitle}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <ScrollReveal direction="up" delay={0.1}>
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group text-center p-10 rounded-3xl bg-gray-900/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 luxury-card border border-gray-800"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-500"
                >
                  <Lightbulb className="w-12 h-12 text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t.features.innovation.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  {t.features.innovation.desc}
                </p>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group text-center p-10 rounded-3xl bg-gray-900/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 luxury-card border border-gray-800"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-24 h-24 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:shadow-2xl group-hover:shadow-cyan-500/50 transition-all duration-500"
                >
                  <Users className="w-12 h-12 text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t.features.client.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  {t.features.client.desc}
                </p>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group text-center p-10 rounded-3xl bg-gray-900/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 luxury-card border border-gray-800 md:col-span-2 lg:col-span-1"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-24 h-24 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:shadow-2xl group-hover:shadow-pink-500/50 transition-all duration-500"
                >
                  <Award className="w-12 h-12 text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t.features.results.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  {t.features.results.desc}
                </p>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Future-Ready Tech Stack / Web3 Section */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-gray-950 via-slate-950 to-gray-900 text-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute -right-40 -top-40 w-96 h-96 bg-cyan-500/40 blur-[120px]" />
          <div className="absolute -left-32 bottom-0 w-80 h-80 bg-purple-500/40 blur-[110px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.15),transparent_60%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.15),transparent_60%)]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <p className="text-sm md:text-base font-semibold tracking-[0.25em] text-cyan-300 uppercase mb-4">
              {language === 'en' ? 'FUTURE-READY STACK' : 'بُنية تقنية للمستقبل'}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 luxury-text">
              {t.future.title}
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              {t.future.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                key: 'ai',
                icon: '⚡️',
              },
              {
                key: 'cloud',
                icon: '☁️',
              },
              {
                key: 'web3',
                icon: '⛓️',
              },
            ].map((item, index) => {
              const pillar = (t.future.pillars as any)[item.key];
              return (
                <div
                  key={item.key}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-xl shadow-[0_0_40px_rgba(15,23,42,0.8)] hover:shadow-[0_0_70px_rgba(56,189,248,0.45)] transition-all duration-500"
                  style={{ animationDelay: `${200 + index * 100}ms` }}
                >
                  <div className="absolute inset-px rounded-[22px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_60%),radial-gradient(circle_at_bottom,_rgba(139,92,246,0.25),transparent_60%)] opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-8 h-full flex flex-col">
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 rtl:gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/70 border border-cyan-400/30 shadow-[0_0_25px_rgba(56,189,248,0.6)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                          <span className="text-xl">{item.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-semibold text-white">
                            {pillar.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm md:text-base text-slate-200 leading-relaxed flex-1">
                      {pillar.desc}
                    </p>

                    <div className="mt-6 flex items-center text-xs md:text-sm text-cyan-300 font-medium">
                      <span className="h-px w-8 bg-gradient-to-r from-cyan-400 to-purple-500 mr-2 rtl:mr-0 rtl:ml-2" />
                      {language === 'en'
                        ? 'Optimised for AI, Cloud & Web3 workloads'
                        : 'مصمم لتحمّل أعباء الذكاء الاصطناعي والسحابة و Web3'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Services Section - Premium 3D Cards */}
      <section className="py-24 px-4 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-3d"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-3d" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal direction="up" delay={0.2}>
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-6"
              >
                <span className="px-6 py-3 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 text-purple-300 text-sm font-semibold rounded-full backdrop-blur-sm uppercase tracking-wider">
                  Our Expertise
                </span>
              </motion.div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 luxury-text">
                {t.services.title}
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {t.services.subtitle}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                icon: TrendingUp,
                title: language === 'en' ? "Digital Marketing" : "التسويق الرقمي",
                desc: language === 'en' ? "From SEO and content strategy to social media and paid ads, we build campaigns that convert and drive growth." : "من تحسين محركات البحث واستراتيجية المحتوى إلى وسائل التواصل الاجتماعي والإعلانات المدفوعة، نبني حملات تحول وتدفع النمو.",
                gradient: "from-purple-600 to-pink-600"
              },
              {
                icon: Code,
                title: language === 'en' ? "Web & Mobile Development" : "تطوير الويب والموبايل",
                desc: language === 'en' ? "We craft custom, scalable and secure websites and mobile applications using modern technologies." : "نصنع مواقع ويب وتطبيقات موبايل مخصصة وقابلة للتوسع وآمنة باستخدام التقنيات الحديثة.",
                gradient: "from-cyan-600 to-blue-600"
              },
              {
                icon: Palette,
                title: language === 'en' ? "UI/UX & Graphic Design" : "تصميم واجهات المستخدم والجرافيك",
                desc: language === 'en' ? "From brand identity to intuitive user interfaces, we bring your vision to life with stunning visuals." : "من الهوية التجارية إلى واجهات المستخدم البديهية، نحول رؤيتك إلى واقع بصور مذهلة.",
                gradient: "from-pink-600 to-orange-600"
              },
            ].map((service, index) => {
              const Icon = service.icon;
              return (
                <ScrollReveal key={index} direction="up" delay={0.1 * (index + 1)}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="group relative h-full"
                  >
                    {/* 3D Card Container */}
                    <div className="relative h-full p-10 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden transform-3d">
                      {/* Animated Gradient Border */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/50 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                      {/* Icon Container with 3D Effect */}
                      <motion.div
                        whileHover={{ rotateY: 360, scale: 1.1 }}
                        transition={{ duration: 0.8 }}
                        className={`relative w-20 h-20 mb-8 rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5 shadow-2xl`}
                      >
                        <div className="w-full h-full bg-gray-900 rounded-2xl flex items-center justify-center">
                          <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                        </div>
                      </motion.div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {service.desc}
                      </p>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-cyan-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                      {/* Corner Accent */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* 3D Shadow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10 transform translate-y-4"></div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-gray-950">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white mb-8 animate-fade-in-up luxury-text">
            {t.testimonials.title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-16 animate-fade-in-up delay-100 leading-relaxed">
            {t.testimonials.subtitle}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {[
              { text: language === 'en' ? "Working with Blore Agency was a game-changer for our brand. Their blend of creativity and technical expertise brought our vision to life. The new website looks incredible and our conversion rates have skyrocketed!" : "كان العمل مع بلور أجنسي نقطة تحول لعلامتنا التجارية. مزيجهم من الإبداع والخبرة التقنية حول رؤيتنا إلى واقع. الموقع الجديد يبدو رائعًا ومعدلات التحويل لدينا ارتفعت بشكل كبير!", author: language === 'en' ? "Ahmed, CEO of Company X" : "أحمد، الرئيس التنفيذي لشركة X" },
              { text: language === 'en' ? "We were looking for a team that could understand our vision and execute it flawlessly. Blore Agency did just that, and their strategic insights were invaluable. Highly recommend!" : "كنا نبحث عن فريق يمكنه فهم رؤيتنا وتنفيذها بلا عيوب. فعلت بلور أجنسي ذلك بالضبط، وكانت رؤاهم الاستراتيجية لا تقدر بثمن. أنصح بها بشدة!", author: language === 'en' ? "Fatma, Marketing Manager" : "فاطمة، مديرة التسويق" },
              { text: language === 'en' ? "Blore Agency's design team exceeded our expectations. They captured the essence of our brand perfectly, delivering stunning visuals and a user experience that truly stands out." : "فريق التصميم في بلور أجنسي تجاوز توقعاتنا. لقد التقطوا جوهر علامتنا التجارية بشكل مثالي، وقدمون صورًا مذهلة وتجربة مستخدم تبرز حقًا.", author: language === 'en' ? "Khaled, Founder of Z Solutions" : "خالد، مؤسس حلول Z" },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="relative p-10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-xl border-l-4 border-purple-500 overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up luxury-card"
                style={{ animationDelay: `${1200 + index * 100}ms` }}
              >
                <Quote className="absolute top-6 left-6 w-12 h-12 text-purple-200 dark:text-purple-800 opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="text-lg md:text-xl italic text-gray-700 dark:text-gray-300 leading-relaxed mb-8 mt-8 relative z-10">
                  "{testimonial.text}"
                </p>
                <div className="font-bold text-gray-900 dark:text-white text-lg relative z-10">
                  - {testimonial.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
