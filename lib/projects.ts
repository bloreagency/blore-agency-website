// lib/projects.ts

export type Project = {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string[];
  image: string;      // صورة الكارت في صفحة Our Work (public/)
  gallery: string[];  // صور التفاصيل (عدد مفتوح)
  tags: string[];
  results?: string;
};

export const projects: Project[] = [
  {
    slug: "livora-scents-rebranding",
    title: "Livora Scents Rebranding — Luxury Home Fragrance Brand",
    category: "Luxury Branding & Identity",
    shortDescription:
      "Elegant rebranding for Livora Scents with a versatile luxury identity that builds recognition and loyalty.",
    fullDescription: [
      "Modern, elegant identity reflecting premium positioning.",
      "Flexible system across packaging, web, and social.",
      "Focus on recognizability and consistency.",
    ],
    image: "/images/portfolio-livora-scents.jpg",
    gallery: [
      "/images/projects/livora-scents-rebranding/1.jpg",
      "/images/projects/livora-scents-rebranding/2.jpg",
      "/images/projects/livora-scents-rebranding/3.jpg",
      "/images/projects/livora-scents-rebranding/4.jpg",
      "/images/projects/livora-scents-rebranding/5.jpg",
      "/images/projects/livora-scents-rebranding/6.jpg",
      "/images/projects/livora-scents-rebranding/7.jpg",
      "/images/projects/livora-scents-rebranding/8.jpg",
      "/images/projects/livora-scents-rebranding/9.jpg",
      "/images/projects/livora-scents-rebranding/10.jpg",
      "/images/projects/livora-scents-rebranding/11.jpg",
      "/images/projects/livora-scents-rebranding/12.jpg",
      "/images/projects/livora-scents-rebranding/13.jpg",
    ],
    tags: ["Branding", "Rebranding", "Luxury", "Logo"],
    results: "Distinctive luxury identity across digital & print",
  },

  {
    slug: "qatrat-al-nada-medical-services",
    title: "Qatrat Al Nada Medical Services",
    category: "Medical Services Branding",
    shortDescription:
      "Brand identity and digital presence for a leading home healthcare provider.",
    fullDescription: [
      "Complete brand system aligned with audience needs.",
      "Website and assets optimized for conversions and clarity.",
    ],
    image: "/images/portfolio-qatrat-alnada.jpg",
    gallery: [
      "/images/projects/qatrat-al-nada-medical-services/1.jpg",
      "/images/projects/qatrat-al-nada-medical-services/2.jpg",
      "/images/projects/qatrat-al-nada-medical-services/3.jpg",
      "/images/projects/qatrat-al-nada-medical-services/4.jpg",
      "/images/projects/qatrat-al-nada-medical-services/5.jpg",
      "/images/projects/qatrat-al-nada-medical-services/7.jpg",
      "/images/projects/qatrat-al-nada-medical-services/8.jpg",
    ],
    tags: ["Branding", "Healthcare", "Web Design"],
    results: "50% increase in inquiries",
  },

  {
    slug: "thiqa-medical-services",
    title: "Thiqa Medical Services",
    category: "Healthcare Solutions",
    shortDescription:
      "Robust digital platform for bookings and patient flows.",
    fullDescription: [
      "End-to-end UX/UI and scalable architecture.",
      "Appointment flow, mobile responsiveness, analytics-focused.",
    ],
    image: "/images/portfolio-thiqa-medical.jpg",
    gallery: [
      "/images/projects/thiqa-medical-services/1.jpg",
      "/images/projects/thiqa-medical-services/2.jpg",
      "/images/projects/thiqa-medical-services/3.jpg",
      "/images/projects/thiqa-medical-services/4.jpg",
      "/images/projects/thiqa-medical-services/5.jpg",
      "/images/projects/thiqa-medical-services/6.jpg",
      "/images/projects/thiqa-medical-services/7.jpg",
      "/images/projects/thiqa-medical-services/8.jpg",
    ],
    tags: ["Web Development", "Healthcare", "Platform"],
    results: "Increased bookings by 40%",
  },

  {
    slug: "blore-motion-graphics",
    title: "Blore Motion Graphics",
    category: "Motion Graphics & Animation",
    shortDescription:
      "Engaging motion graphics for promotional campaigns.",
    fullDescription: [
      "Dynamic motion assets for paid & organic distribution.",
      "Modular files to accelerate future content cycles.",
    ],
    image: "/images/portfolio-blore-motion.png",
    gallery: [
      "/images/projects/blore-motion-graphics/1.jpg",
      "/images/projects/blore-motion-graphics/2.jpg",
      "/images/projects/blore-motion-graphics/3.jpg",
      "/images/projects/blore-motion-graphics/4.jpg",
      "/images/projects/blore-motion-graphics/5.jpg",
    ],
    tags: ["Motion Graphics", "Animation", "Promotion"],
    results: "Enhanced engagement by 35%",
  },

  {
    slug: "techstart-complete-rebrand",
    title: "TechStart Complete Rebrand",
    category: "Branding & Identity",
    shortDescription:
      "Comprehensive identity for an innovative tech startup.",
    fullDescription: [
      "Logo, color systems, and brand guidelines.",
      "Digital-ready assets and product branding.",
    ],
    image: "/images/portfolio-rebrand.png",
    gallery: [
      "/images/projects/techstart-complete-rebrand/1.jpg",
      "/images/projects/techstart-complete-rebrand/2.jpg",
      "/images/projects/techstart-complete-rebrand/3.jpg",
      "/images/projects/techstart-complete-rebrand/4.jpg",
    ],
    tags: ["Branding", "Logo Design", "Digital Assets"],
    results: "300% brand recognition",
  },

  {
    slug: "ecommerce-platform-redesign",
    title: "E-Commerce Platform Redesign",
    category: "Web Development",
    shortDescription:
      "Custom e-commerce with advanced features and mobile-first UX.",
    fullDescription: [
      "Conversion-focused UI with clear catalog structure.",
      "Performance, SEO, and analytics built-in.",
    ],
    image: "/images/portfolio-ecommerce.png",
    gallery: [
      "/images/projects/ecommerce-platform-redesign/1.jpg",
      "/images/projects/ecommerce-platform-redesign/2.jpg",
      "/images/projects/ecommerce-platform-redesign/3.jpg",
      "/images/projects/ecommerce-platform-redesign/4.jpg",
    ],
    tags: ["Web Development", "E-commerce", "UI/UX"],
    results: "150% increase in sales",
  },

  {
    slug: "fittrack-mobile-app",
    title: "FitTrack Mobile App",
    category: "Mobile Application",
    shortDescription:
      "Comprehensive fitness tracking app with social features.",
    fullDescription: [
      "Clear onboarding, gamified goals, and community features.",
      "Focus on retention and habit formation.",
    ],
    image: "/images/portfolio-fitness-app.png",
    gallery: [
      "/images/projects/fittrack-mobile-app/1.jpg",
      "/images/projects/fittrack-mobile-app/2.jpg",
      "/images/projects/fittrack-mobile-app/3.jpg",
      "/images/projects/fittrack-mobile-app/4.jpg",
    ],
    tags: ["Mobile App", "UI/UX", "Fitness"],
    results: "50K+ downloads",
  },

  {
    slug: "brand-motion-campaign",
    title: "Brand Motion Campaign",
    category: "Motion Graphics",
    shortDescription:
      "Dynamic animated content for social campaigns.",
    fullDescription: [
      "Storyboards, motion templates, and export presets.",
      "Optimized for paid formats and platform specs.",
    ],
    image: "/images/portfolio-motion-graphics.png",
    gallery: [
      "/images/projects/brand-motion-campaign/1.jpg",
      "/images/projects/brand-motion-campaign/1.jpg",
      "/images/projects/brand-motion-campaign/1.jpg",
    ],
    tags: ["Motion Graphics", "Animation", "Social Media"],
    results: "2M+ video views",
  },

  {
    slug: "social-growth-strategy",
    title: "Social Growth Strategy",
    category: "Social Media Marketing",
    shortDescription:
      "Full-funnel content and performance ads.",
    fullDescription: [
      "Content calendar, asset kits, and tone of voice.",
      "A/B testing and audience segmentation.",
    ],
    image: "/images/portfolio-social-media.png",
    gallery: [
      "/images/projects/social-growth-strategy/1.jpg",
      "/images/projects/social-growth-strategy/2.jpg",
      "/images/projects/social-growth-strategy/3.jpg",
    ],
    tags: ["Social Media", "Marketing", "Content Creation"],
    results: "400% increase in engagement",
  },

  {
    slug: "ai-marketing-dashboard",
    title: "AI Marketing Dashboard",
    category: "AI-Powered Tools",
    shortDescription:
      "Predictive insights and performance analytics.",
    fullDescription: [
      "Custom KPIs, anomaly detection, and reporting.",
      "Integrations with paid channels & CRM.",
    ],
    image: "/images/portfolio-ai-dashboard.png",
    gallery: [
      "/images/projects/ai-marketing-dashboard/1.jpg",
      "/images/projects/ai-marketing-dashboard/2.jpg",
      "/images/projects/ai-marketing-dashboard/3.jpg",
    ],
    tags: ["AI Tools", "Analytics", "Dashboard"],
    results: "60% improvement in ROI",
  },
  
  // المشاريع التي تم إضافتها حديثًا
  {
    slug: "ideolingo",
    title: "Ideolingo",
    category: "Web & Translation Services",
    shortDescription: "A comprehensive digital solution for a platform providing professional translation and localization services for various sectors.",
    fullDescription: [
      "Developed a custom website tailored for translation services.",
      "Created a unique brand identity and logo.",
      "Designed a user-friendly interface for a seamless translation ordering process.",
    ],
    image: "/images/ideolingo-project-hero.jpg",
    gallery: [
        "/images/projects/ideolingo/1.png",
        "/images/projects/ideolingo/2.png",
        "/images/projects/ideolingo/3.png",
        "/images/projects/ideolingo/4.png",
        "/images/projects/ideolingo/5.png",
        "/images/projects/ideolingo/6.png",
    ],
    tags: ["Translation", "Localization", "Web Development", "Branding"],
    results: "Enhanced brand perception and user engagement."
  },
  {
    slug: "alnahda-factory",
    title: "Al Nahda Factory",
    category: "E-commerce & Branding",
    shortDescription: "A modern website and complete visual identity for a factory specializing in high-quality cotton textiles.",
    fullDescription: [
      "Designed a responsive e-commerce website.",
      "Developed a complete visual identity and brand guidelines.",
      "Integrated product catalog with a focus on high-quality visuals.",
    ],
    image: "/images/alnahda-factory-project-hero.jpg",
    gallery: [
        "/images/projects/alnahda-factory/1.png",
        "/images/projects/alnahda-factory/2.png",
        "/images/projects/alnahda-factory/3.png",
        "/images/projects/alnahda-factory/4.png",
        "/images/projects/alnahda-factory/5.png",
    ],
    tags: ["E-commerce", "Web Development", "Branding", "Visual Identity"],
    results: "Streamlined online sales process and boosted brand image."
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}