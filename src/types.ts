export interface TeamMember {
  name: string;
  role: string;
  tasks: string[];
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface PricingPackage {
  name: string;
  price: string;
  priceValue: number;
  features: string[];
  bestFor: string;
  color: string;
}

export interface PortfolioItem {
  title: string;
  category: string;
  image: string;
  description: string;
}

export const TEAM: TeamMember[] = [
  {
    name: "Nathan",
    role: "Sales & Growth Director",
    tasks: ["Client meetings", "Communication & negotiation", "Strategy & planning"]
  },
  {
    name: "Didy",
    role: "Brand Identity Designer",
    tasks: ["Logo design", "Posters & social media creatives", "Visual branding"]
  },
  {
    name: "Adonai",
    role: "Web Developer",
    tasks: ["Website design & development", "Landing pages", "Technical setup"]
  }
];

export const SERVICES: Service[] = [
  {
    title: "Social Media Management",
    description: "Full-service management to grow your community and engagement.",
    icon: "Share2"
  },
  {
    title: "Website Design",
    description: "Modern, responsive websites that convert visitors into customers.",
    icon: "Globe"
  },
  {
    title: "Logo & Brand Identity",
    description: "Crafting unique visual identities that stand out in the market.",
    icon: "Palette"
  },
  {
    title: "Content Creation",
    description: "Video, voiceover, interviews, and professional shoots.",
    icon: "Video"
  },
  {
    title: "Online Presence Optimization",
    description: "Ensuring your brand is found and looks its best everywhere.",
    icon: "Zap"
  }
];

export const PRICING: PricingPackage[] = [
  {
    name: "Starter Package",
    price: "Basic Presence",
    priceValue: 5000,
    features: [
      "12 posts per month",
      "Caption writing",
      "Basic DM response management",
      "Profile optimization"
    ],
    bestFor: "Small businesses starting online",
    color: "bg-zinc-100"
  },
  {
    name: "Growth Package",
    price: "Professional Management",
    priceValue: 12000,
    features: [
      "20 posts per month",
      "Reels/TikTok short videos",
      "Full DM management",
      "Content planning",
      "Monthly performance report"
    ],
    bestFor: "Businesses wanting real growth",
    color: "bg-novyra-orange/10"
  },
  {
    name: "Premium Package",
    price: "Full Brand Control",
    priceValue: 25000,
    features: [
      "Everything in Growth",
      "Website design or landing page",
      "Professional content shoot (monthly)",
      "Paid ad setup guidance",
      "Complete brand strategy"
    ],
    bestFor: "Established brands ready to dominate",
    color: "bg-novyra-purple/10"
  }
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    title: "The Gourmet Kitchen",
    category: "Restaurant Demo",
    image: "https://picsum.photos/seed/restaurant/800/600",
    description: "Logo redesign and Instagram feed overhaul for a high-end eatery."
  },
  {
    title: "Iron Temple Gym",
    category: "Gym Demo",
    image: "https://picsum.photos/seed/gym/800/600",
    description: "Before & After social media transformation and community growth."
  },
  {
    title: "St. Jude Academy",
    category: "School Demo",
    image: "https://picsum.photos/seed/school/800/600",
    description: "Professional layout and branding for an educational institution."
  }
];
