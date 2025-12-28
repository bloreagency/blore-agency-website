"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  Send,
  MessageCircle,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Loader2,
  MapPin,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: t('contact.form.success'),
        });
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          service: "",
          budget: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: result.message || t('contact.form.error'),
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: t('contact.form.error'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen dark:bg-gray-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 rgb-animated relative overflow-hidden">
        <div
          className="absolute inset-0 bg-black/30 dark:bg-black/50 pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            {t('contact.hero.title')}
          </h1>
          <p className="text-xl text-white/90 leading-relaxed animate-fade-in-up delay-200">
            {t('contact.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {t('contact.form.title')}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t('contact.form.name')} *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-gray-900/50 backdrop-blur-sm border-gray-700 text-white focus:border-purple-500 focus:ring-purple-500"
                      placeholder={t('contact.form.name')}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t('contact.form.email')} *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-gray-900/50 backdrop-blur-sm border-gray-700 text-white focus:border-purple-500 focus:ring-purple-500"
                      placeholder={t('contact.form.email')}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t('contact.form.company')}
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-gray-900/50 backdrop-blur-sm border-gray-700 text-white focus:border-purple-500 focus:ring-purple-500"
                      placeholder={t('contact.form.company')}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t('contact.form.phone')}
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-gray-900/50 backdrop-blur-sm border-gray-700 text-white focus:border-purple-500 focus:ring-purple-500"
                      placeholder={t('contact.form.phone')}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t('contact.form.service')}
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-white focus:border-purple-500 focus:ring-purple-500"
                    >
                      <option value="">{t('contact.form.service')}</option>
                      <option value="Branding & Graphic Design">{t('services.branding.title')}</option>
                      <option value="Web Design & Development">{t('services.web.title')}</option>
                      <option value="Mobile Applications">{t('services.mobile.title')}</option>
                      <option value="Motion Graphics & Video Editing">{t('services.motion.title')}</option>
                      <option value="Social Media Marketing">{t('services.social.title')}</option>
                      <option value="AI-Powered Marketing Tools">{t('services.ai.title')}</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="budget"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t('contact.form.budget')}
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-white focus:border-purple-500 focus:ring-purple-500"
                    >
                      <option value="">{t('contact.form.budget')}</option>
                      <option value="Under $5,000">Under $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                      <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                      <option value="$50,000+">$50,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t('contact.form.message')} *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:border-purple-500 focus:ring-purple-500 resize-none"
                    placeholder={t('contact.form.message')}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white py-6 text-lg rounded-full transform hover:scale-105 transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5 mr-2" />
                  )}
                  {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                </Button>

                {submitStatus && (
                  <div
                    className={`p-4 rounded-md text-center ${submitStatus.type === "success"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                      : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                      }`}
                  >
                    {submitStatus.message}
                  </div>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('contact.info.title')}</h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                  {t('contact.info.subtitle')}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 rtl:space-x-reverse group">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-semibold text-lg">{t('contact.info.email')}</h3>
                    <p className="text-gray-600 dark:text-gray-300">info@bloreagency.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 rtl:space-x-reverse group">
                  <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-semibold text-lg">{t('contact.info.phone')}</h3>
                    <p className="text-gray-600 dark:text-gray-300">+20 120 294 4459</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 rtl:space-x-reverse group">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-semibold text-lg">{t('contact.info.whatsapp')}</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t('contact.info.whatsapp_desc')} •{" "}
                      <a
                        href="https://wa.me/201202944459"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 underline"
                      >
                        WhatsApp (+20 120 294 4459)
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 rtl:space-x-reverse group">
                  <div className="w-14 h-14 bg-gradient-to-r from-cyan-600 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-semibold text-lg">{t('contact.info.address')}</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t('contact.info.address_value')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-purple-50 to-cyan-50 dark:from-purple-900/20 dark:to-cyan-900/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-800">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('contact.social.title')}
                </h3>
                <div className="flex space-x-4 rtl:space-x-reverse">
                  <a
                    href="https://m.facebook.com/bloreagency.EG/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="https://x.com/bloreagency_eg?t=CjizSyZnxEAoVmKXW_HQew&s=09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/bloreagency/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/bloreagency.eg/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gradient-to-r from-cyan-600 to-purple-500 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-gradient-to-br from-cyan-50 to-purple-50 dark:from-cyan-900/20 dark:to-purple-900/20 p-6 rounded-2xl border border-cyan-100 dark:border-cyan-800">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {t('contact.hours.title')}
                  </h3>
                </div>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    <strong>{t('contact.hours.email')}</strong> {t('contact.hours.email_value')}
                  </p>
                  <p>
                    <strong>{t('contact.hours.working')}</strong> {t('contact.hours.working_value')}
                  </p>
                  <p>
                    <strong>{t('contact.hours.consultation')}</strong> {t('contact.hours.consultation_value')}
                  </p>
                </div>
              </div>

              {/* What Happens Next */}
              <div className="bg-gradient-to-br from-purple-50 to-cyan-50 dark:from-purple-900/20 dark:to-cyan-900/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-800">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t('contact.next.title')}
                </h3>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 rtl:mr-0 rtl:ml-3 mt-0.5">
                      1
                    </div>
                    <p>{t('contact.next.step1')}</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 rtl:mr-0 rtl:ml-3 mt-0.5">
                      2
                    </div>
                    <p>{t('contact.next.step2')}</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 rtl:mr-0 rtl:ml-3 mt-0.5">
                      3
                    </div>
                    <p>{t('contact.next.step3')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
