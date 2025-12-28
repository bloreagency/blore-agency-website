'use client';

import { Heart, Eye, Users, Target, Zap, Shield, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen dark:bg-gray-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 rgb-animated relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">{t('about.hero.title')}</h1>
          <p className="text-xl text-white/90 leading-relaxed">
            {t('about.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">{t('about.who_we_are.title')}</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                {t('about.who_we_are.desc1')}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                {t('about.who_we_are.desc2')}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                {t('about.who_we_are.desc3')}
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">{t('about.stats.projects')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">{t('about.stats.satisfaction')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">{t('about.stats.experience')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">{t('about.stats.support')}</span>
                </div>
              </div>
            </div>

            <div className="relative w-full h-96">
              <Image
                src="/images/about-us.png"
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
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">{t('about.values.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('about.values.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-800">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('about.values.passion.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('about.values.passion.desc')}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('about.values.vision.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('about.values.vision.desc')}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('about.values.precision.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('about.values.precision.desc')}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('about.values.innovation.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('about.values.innovation.desc')}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('about.values.collaboration.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('about.values.collaboration.desc')}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('about.values.integrity.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('about.values.integrity.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('about.leadership.title')}</h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t('about.leadership.subtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { n: "Hossam Amer", r: "Chief Executive Officer", img: "/hossam-amer.jpg" },
              { n: "Mohamed Hassan", r: "Chief Financial Officer", img: "/mohamed-hassan.jpg" },
              { n: "Anoud Abdullah", r: "Marketing Manager", img: "/anoud-abdullah.jpg" },
              { n: "Abdo Hendy", r: "Head of Media Department", img: "/abdo-hendy.jpg" },
            ].map((m) => (
              <div key={m.n} className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-sm hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 text-center border border-gray-800">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={m.img}
                    alt={m.n}
                    fill
                    sizes="96px"
                    className="rounded-full object-cover border-4 border-white dark:border-gray-800 shadow"
                  />
                </div>
                <h3 className="font-semibold text-xl text-gray-900 dark:text-white">{m.n}</h3>
                <p className="text-purple-600 dark:text-purple-400 text-sm mb-3">{m.r}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm italic">
                  "{t('about.leadership.quote')}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">{t('about.different.title')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('about.different.subtitle')}
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-50 to-cyan-50 dark:from-purple-900/20 dark:to-cyan-900/20 p-8 rounded-2xl border border-purple-100 dark:border-purple-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('about.different.expertise.title')}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {t('about.different.expertise.desc')}
              </p>
            </div>

            <div className="bg-gradient-to-r from-cyan-50 to-purple-50 dark:from-cyan-900/20 dark:to-purple-900/20 p-8 rounded-2xl border border-cyan-100 dark:border-cyan-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('about.different.future.title')}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {t('about.different.future.desc')}
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-cyan-50 dark:from-purple-900/20 dark:to-cyan-900/20 p-8 rounded-2xl border border-purple-100 dark:border-purple-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('about.different.track.title')}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {t('about.different.track.desc')}
              </p>
            </div>

            <div className="bg-gradient-to-r from-cyan-50 to-purple-50 dark:from-cyan-900/20 dark:to-purple-900/20 p-8 rounded-2xl border border-cyan-100 dark:border-cyan-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('about.different.personalized.title')}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {t('about.different.personalized.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
