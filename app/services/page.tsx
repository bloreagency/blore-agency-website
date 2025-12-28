'use client';

import Link from "next/link";
import { Palette, Code, Smartphone, Video, Megaphone, Brain, Shield, ArrowRight, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ServicesPage() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Palette,
      title: t('services.branding.title'),
      description: t('services.branding.description'),
      features: [
        t('services.branding.features.0'),
        t('services.branding.features.1'),
        t('services.branding.features.2'),
        t('services.branding.features.3'),
        t('services.branding.features.4'),
        t('services.branding.features.5'),
      ],
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: Code,
      title: t('services.web.title'),
      description: t('services.web.description'),
      features: [
        t('services.web.features.0'),
        t('services.web.features.1'),
        t('services.web.features.2'),
        t('services.web.features.3'),
        t('services.web.features.4'),
        t('services.web.features.5'),
      ],
      gradient: "from-cyan-500 to-cyan-600",
    },
    {
      icon: Smartphone,
      title: t('services.mobile.title'),
      description: t('services.mobile.description'),
      features: [
        t('services.mobile.features.0'),
        t('services.mobile.features.1'),
        t('services.mobile.features.2'),
        t('services.mobile.features.3'),
        t('services.mobile.features.4'),
        t('services.mobile.features.5'),
      ],
      gradient: "from-purple-600 to-cyan-500",
    },
    {
      icon: Video,
      title: t('services.motion.title'),
      description: t('services.motion.description'),
      features: [
        t('services.motion.features.0'),
        t('services.motion.features.1'),
        t('services.motion.features.2'),
        t('services.motion.features.3'),
        t('services.motion.features.4'),
        t('services.motion.features.5'),
      ],
      gradient: "from-cyan-600 to-purple-500",
    },
    {
      icon: Megaphone,
      title: t('services.social.title'),
      description: t('services.social.description'),
      features: [
        t('services.social.features.0'),
        t('services.social.features.1'),
        t('services.social.features.2'),
        t('services.social.features.3'),
        t('services.social.features.4'),
        t('services.social.features.5'),
      ],
      gradient: "from-purple-500 to-cyan-500",
    },
    {
      icon: Brain,
      title: t('services.ai.title'),
      description: t('services.ai.description'),
      features: [
        t('services.ai.features.0'),
        t('services.ai.features.1'),
        t('services.ai.features.2'),
        t('services.ai.features.3'),
        t('services.ai.features.4'),
        t('services.ai.features.5'),
      ],
      gradient: "from-cyan-500 to-purple-600",
    },
    {
      icon: Shield,
      title: t('services.cyber.title'),
      description: t('services.cyber.description'),
      features: [
        t('services.cyber.features.0'),
        t('services.cyber.features.1'),
        t('services.cyber.features.2'),
        t('services.cyber.features.3'),
        t('services.cyber.features.4'),
        t('services.cyber.features.5'),
      ],
      gradient: "from-red-500 to-orange-600",
    },
  ];

  return (
    <div className="min-h-screen dark:bg-gray-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 rgb-animated relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">{t('services.hero.title')}</h1>
          <p className="text-xl text-white/90 leading-relaxed animate-fade-in-up delay-200">
            {t('services.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group hover:transform hover:scale-105 luxury-card"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{service.description}</p>

                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-gray-700 dark:text-gray-300 flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">{t('services.process.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('services.process.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: t('services.process.step1.title'),
                description: t('services.process.step1.desc'),
              },
              {
                step: "02",
                title: t('services.process.step2.title'),
                description: t('services.process.step2.desc'),
              },
              {
                step: "03",
                title: t('services.process.step3.title'),
                description: t('services.process.step3.desc'),
              },
              {
                step: "04",
                title: t('services.process.step4.title'),
                description: t('services.process.step4.desc'),
              },
            ].map((phase, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                  {phase.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{phase.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">{t('services.cta.title')}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {t('services.cta.subtitle')}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold hover:from-purple-700 hover:to-cyan-600 transition luxury-button"
          >
            {t('services.cta.button')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
