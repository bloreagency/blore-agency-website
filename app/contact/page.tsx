"use client";

import Head from "next/head";
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
  MapPin, // لإظهار العنوان
} from "lucide-react";

export default function ContactPage() {
  // ====== SEO (Client-safe via next/head) ======
  const SEO = (
    <Head>
      <title>Contact Us | BLORE Agency</title>
      <meta
        name="description"
        content="Get in touch with BLORE Agency. Let's discuss your project and explore how we can help you achieve your digital goals in Egypt & KSA."
      />
      <link rel="canonical" href="https://www.bloreagency.com/contact" />
      {/* Open Graph */}
      <meta property="og:title" content="Contact BLORE Agency" />
      <meta
        property="og:description"
        content="Ready to bring your vision to life? Contact BLORE Agency for branding, web, media, and AI solutions."
      />
      <meta property="og:url" content="https://www.bloreagency.com/contact" />
      <meta property="og:site_name" content="BLORE Agency" />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://www.bloreagency.com/images/portfolio-blore-motion.png"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Contact BLORE Agency" />
      <meta
        name="twitter:description"
        content="We’d love to hear about your project and how we can help you succeed."
      />
      <meta
        name="twitter:image"
        content="https://www.bloreagency.com/images/portfolio-blore-motion.png"
      />
    </Head>
  );

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
          message: "Your message has been sent successfully!",
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
          message: result.message || "An error occurred. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          "An unexpected error occurred. Please check your connection and try again.",
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
      [e.target.name]: e.target.value, // <-- كما في كودك
    });
  };

  return (
    <div className="min-h-screen">
      {SEO}

      {/* ===== Hero Section — تم استبدال الخلفية الثابتة بـ RGB فقط ===== */}
      <section className="pt-32 pb-20 px-4 rgb-animated relative overflow-hidden">
        <div
          className="absolute inset-0 bg-black/30 pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Let's Talk
          </h1>
          <p className="text-xl text-white/90 leading-relaxed animate-fade-in-up delay-200">
            Ready to bring your vision to life? We'd love to hear about your
            project and explore how we can help you achieve your digital goals.
            Get in touch with us today and let's start creating something amazing
            together!
          </p>
        </div>
      </section>

      {/* Contact Form & Info (بدون أي تغيير شكلي على الفورم) */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Company
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Service Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:border-purple-500 focus:ring-purple-500"
                    >
                      <option value="">Select a service</option>
                      <option value="Branding & Graphic Design">
                        Branding & Graphic Design
                      </option>
                      <option value="Web Design & Development">
                        Web Design & Development
                      </option>
                      <option value="Mobile Applications">
                        Mobile Applications
                      </option>
                      <option value="Motion Graphics & Video Editing">
                        Motion Graphics & Video Editing
                      </option>
                      <option value="Social Media Marketing">
                        Social Media Marketing
                      </option>
                      <option value="AI-Powered Marketing Tools">
                        AI-Powered Marketing Tools
                      </option>
                      <option value="Multiple Services">Multiple Services</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="budget"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:border-purple-500 focus:ring-purple-500"
                    >
                      <option value="">Select budget range</option>
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
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500 resize-none"
                    placeholder="Tell us about your project, goals, timeline, and how we can help you achieve success..."
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
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>

                {submitStatus && (
                  <div
                    className={`p-4 rounded-md text-center ${
                      submitStatus.type === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
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
                <h2 className="text-3ل font-bold text-gray-900 mb-6">Get in Touch</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Whether you have a specific project in mind or just want to
                  explore possibilities, we're here to help. Reach out through
                  any of the channels below and let's start a conversation about
                  your digital goals and how we can help you achieve them.
                </p>
              </div>

              {/* نفس ستايل العناصر، مضاف واتساب + العنوان */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4 group">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-semibold text-lg">Email</h3>
                    <p className="text-gray-600">info@bloreagency.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group">
                  <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-semibold text-lg">Phone</h3>
                    <p className="text-gray-600">+20 120 294 4459</p>
                  </div>
                </div>

                {/* واتساب: نفس عنصر "Let's Chat" بإضافة لينك للواتساب */}
                <div className="flex items-center space-x-4 group">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-semibold text-lg">Let's Chat</h3>
                    <p className="text-gray-600">
                      We respond within 24 hours •{" "}
                      <a
                        href="https://wa.me/201202944459"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 underline"
                      >
                        WhatsApp (+20 120 294 4459)
                      </a>
                    </p>
                  </div>
                </div>

                {/* العنوان */}
                <div className="flex items-center space-x-4 group">
                  <div className="w-14 h-14 bg-gradient-to-r from-cyan-600 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-semibold text-lg">Address</h3>
                    <p className="text-gray-600">
                      23 Abbas El-Akkad St., Nasr City, Cairo, Egypt
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media (بدون تغيير) */}
              <div className="bg-gradient-to-br from-purple-50 to-cyan-50 p-6 rounded-2xl border border-purple-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
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

              {/* Response Time / Hours (تم تعديل المواعيد فقط) */}
              <div className="bg-gradient-to-br from-cyan-50 to-purple-50 p-6 rounded-2xl border border-cyan-100">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-purple-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Response Time & Working Hours
                  </h3>
                </div>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Email:</strong> Within 24 hours
                  </p>
                  <p>
                    <strong>Working Hours:</strong> Saturday – Thursday, 9:00 AM – 6:00 PM (GMT+2)
                  </p>
                  <p>
                    <strong>Project Consultation:</strong> Same day response for urgent inquiries
                  </p>
                </div>
              </div>

              {/* What Happens Next? (بدون تغيير) */}
              <div className="bg-gradient-to-br from-purple-50 to-cyan-50 p-6 rounded-2xl border border-purple-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  What Happens Next?
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      1
                    </div>
                    <p>We'll review your message and respond within 24 hours</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      2
                    </div>
                    <p>Schedule a consultation call to discuss your project in detail</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      3
                    </div>
                    <p>Receive a customized proposal tailored to your needs and budget</p>
                  </div>
                </div>
              </div>
            </div>
            {/* /Right */}
          </div>
        </div>
      </section>
    </div>
  );
}
