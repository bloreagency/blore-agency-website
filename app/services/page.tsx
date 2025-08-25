import Link from "next/link";
import { Palette, Code, Smartphone, Video, Megaphone, Brain, ArrowRight, CheckCircle } from "lucide-react";

/** ===== SEO (App Router) ===== */
export const metadata = {
  title: "Services | BLORE Agency",
  description:
    "Discover BLORE Agency services: Branding & Graphic Design, Web Design & Development, Mobile Apps, Motion Graphics, Social Media Marketing, and AI Marketing Solutions.",
  alternates: { canonical: "https://www.bloreagency.com/services" },
  openGraph: {
    title: "Services | BLORE Agency",
    description:
      "Branding, Web, Mobile, Motion, Social Media, and AI Marketing solutions tailored to your goals in Egypt & KSA.",
    url: "https://www.bloreagency.com/services",
    siteName: "BLORE Agency",
    type: "website",
    images: [
      { url: "/images/portfolio-blore-motion.png", width: 1200, height: 630, alt: "BLORE Agency Services" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | BLORE Agency",
    description: "We craft measurable, high-impact solutions across branding, web, media, and AI.",
    images: ["/images/portfolio-blore-motion.png"],
  },
};

export default function ServicesPage() {
  const services = [
    {
      icon: Palette,
      title: "Branding & Graphic Design",
      description:
        "Complete brand identity systems that capture your essence and create lasting impressions in the market.",
      features: [
        "Logo Design & Brand Identity",
        "Brand Guidelines & Style Guides",
        "Print & Digital Collateral",
        "Packaging Design",
        "Brand Strategy & Positioning",
        "Visual Identity Systems",
      ],
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: Code,
      title: "Web Design & Development",
      description:
        "Custom websites and web applications built with cutting-edge technology and stunning, responsive design.",
      features: [
        "Responsive Web Design",
        "E-commerce Solutions",
        "CMS Development",
        "Web Applications",
        "Performance Optimization",
        "SEO Implementation",
      ],
      gradient: "from-cyan-500 to-cyan-600",
    },
    {
      icon: Smartphone,
      title: "Mobile Applications",
      description:
        "Native and cross-platform mobile apps that deliver exceptional user experiences across all devices.",
      features: [
        "iOS App Development",
        "Android App Development",
        "Cross-Platform Solutions",
        "UI/UX Design",
        "App Store Optimization",
        "Maintenance & Support",
      ],
      gradient: "from-purple-600 to-cyan-500",
    },
    {
      icon: Video,
      title: "Motion Graphics & Video Editing",
      description: "Compelling visual storytelling through professional motion graphics and video production services.",
      features: [
        "Motion Graphics Design",
        "Video Editing & Post-Production",
        "Animation & Visual Effects",
        "Brand Video Content",
        "Social Media Videos",
        "Explainer Videos",
      ],
      gradient: "from-cyan-600 to-purple-500",
    },
    {
      icon: Megaphone,
      title: "Social Media Marketing",
      description:
        "Strategic social media campaigns that build communities, drive engagement, and increase brand awareness.",
      features: [
        "Social Media Strategy",
        "Content Creation & Curation",
        "Community Management",
        "Paid Social Advertising",
        "Analytics & Reporting",
        "Influencer Marketing",
      ],
      gradient: "from-purple-500 to-cyan-500",
    },
    {
      icon: Brain,
      title: "AI-Powered Marketing Tools",
      description:
        "Leverage artificial intelligence to optimize your marketing efforts and gain competitive advantages in the market.",
      features: [
        "AI Content Generation",
        "Predictive Analytics",
        "Automated Campaign Optimization",
        "Chatbot Development",
        "Machine Learning Insights",
        "Personalization Engines",
      ],
      gradient: "from-cyan-500 to-purple-600",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section — RGB animated + overlay */}
      <section className="pt-32 pb-20 px-4 rgb-animated relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">Our Services</h1>
          <p className="text-xl text-white/90 leading-relaxed animate-fade-in-up delay-200">
            From creative branding to AI-powered marketing solutions, we provide comprehensive digital services that
            drive results and exceed expectations. Discover how we can transform your vision into reality.
          </p>
        </div>
      </section>

      {/* Services Grid (unchanged) */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group hover:transform hover:scale-105"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-gray-700 flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section (unchanged) */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We follow a proven methodology that ensures every project is delivered on time, on budget, and exceeds
              your expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery & Strategy",
                description:
                  "We dive deep into your business, goals, and target audience to understand your unique needs and develop a comprehensive strategy.",
              },
              {
                step: "02",
                title: "Creative Development",
                description:
                  "Our creative team brings your vision to life with innovative designs and concepts that align with your brand identity and objectives.",
              },
              {
                step: "03",
                title: "Implementation",
                description:
                  "We execute the strategy with precision, utilizing the latest technologies and best practices to deliver exceptional results.",
              },
              {
                step: "04",
                title: "Launch & Optimize",
                description:
                  "We ensure a smooth launch and provide ongoing optimization and support to maximize your success and ROI.",
              },
            ].map((phase, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                  {phase.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{phase.title}</h3>
                <p className="text-gray-600 leading-relaxed">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section (unchanged) */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's discuss your project and explore how our services can help you achieve your digital goals.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold hover:from-purple-700 hover:to-cyan-600 transition"
          >
            Let's Talk
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
