import React from 'react';
import { motion } from 'motion/react';
import { 
  Share2, 
  Globe, 
  Palette, 
  Video, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Instagram,
  Linkedin,
  Twitter,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { TEAM, SERVICES, PRICING, PORTFOLIO } from './types.ts';

const IconMap: Record<string, React.ElementType> = {
  Share2,
  Globe,
  Palette,
  Video,
  Zap
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  React.useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'dark bg-zinc-950 text-white' : 'bg-white text-zinc-900'}`}>
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                <img 
                  src="/logo.jpg" 
                  alt="Novyra Logo" 
                  className="w-full h-full object-cover"
                img/>
              </div>
              <span className="text-2xl font-display font-bold tracking-tighter text-novyra-purple">NOVYRA</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-sm font-medium hover:text-novyra-orange transition-colors dark:text-zinc-300 dark:hover:text-novyra-orange">Who We Are</a>
              <a href="#services" className="text-sm font-medium hover:text-novyra-orange transition-colors dark:text-zinc-300 dark:hover:text-novyra-orange">Services</a>
              <a href="#portfolio" className="text-sm font-medium hover:text-novyra-orange transition-colors dark:text-zinc-300 dark:hover:text-novyra-orange">Portfolio</a>
              <a href="#pricing" className="text-sm font-medium hover:text-novyra-orange transition-colors dark:text-zinc-300 dark:hover:text-novyra-orange">Pricing</a>
              
              <button 
                onClick={() => setIsDarkMode(prev => !prev)}
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={20} className="text-novyra-orange" /> : <Moon size={20} className="text-novyra-purple" />}
                <span className="text-xs font-bold uppercase tracking-widest hidden lg:inline-block">
                  {isDarkMode ? 'Light' : 'Dark'}
                </span>
              </button>

              <button className="bg-novyra-purple text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-novyra-orange transition-all transform hover:scale-105">
                Work With Us
              </button>
            </div>

            <div className="md:hidden flex items-center gap-4">
              <button 
                onClick={() => setIsDarkMode(prev => !prev)}
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                {isDarkMode ? <Sun size={20} className="text-novyra-orange" /> : <Moon size={20} className="text-novyra-purple" />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 py-6 space-y-4"
          >
            <a href="#about" className="block text-lg font-medium dark:text-white" onClick={() => setIsMenuOpen(false)}>Who We Are</a>
            <a href="#services" className="block text-lg font-medium dark:text-white" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#portfolio" className="block text-lg font-medium dark:text-white" onClick={() => setIsMenuOpen(false)}>Portfolio</a>
            <a href="#pricing" className="block text-lg font-medium dark:text-white" onClick={() => setIsMenuOpen(false)}>Pricing</a>
            <button className="w-full bg-novyra-purple text-white py-4 rounded-xl font-bold">Work With Us</button>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-novyra-purple">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-novyra-orange rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-novyra-orange text-white rounded-full">
                Digital Branding & Social Media Agency
              </span>
              <motion.h1 
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15,
                      delayChildren: 0.2,
                    },
                  },
                }}
                initial="hidden"
                animate="visible"
                className="text-5xl md:text-8xl font-display font-black text-white leading-tight mb-8"
              >
                {["BUILDING", "BRANDS", "DIGITALLY"].map((word, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`inline-block mr-4 ${word === "DIGITALLY" ? "text-novyra-orange" : ""}`}
                  >
                    {word}
                    {i === 1 && <br className="hidden md:block" />}
                  </motion.span>
                ))}
              </motion.h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 mb-10">
                We help businesses grow through strategic social media management, 
                stunning web design, and high-impact content creation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-novyra-purple font-bold rounded-full hover:bg-novyra-orange hover:text-white transition-all transform hover:scale-105">
                  View Our Work
                </button>
                <button className="w-full sm:w-auto px-8 py-4 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all">
                  Get a Free Audit
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section id="about" className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-sm font-bold text-novyra-purple uppercase tracking-widest mb-4">Who We Are</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold mb-6 dark:text-white">
                Your Full-Service <br />
                <span className="text-novyra-orange">Digital Partner</span>
              </h3>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                Novyra is a Full-Service Digital Branding & Social Media Agency. 
                We don't just post; we build ecosystems that drive growth. 
                Our mission is to bridge the gap between brands and their digital audience 
                through creativity, strategy, and technical excellence.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-xl mb-2 dark:text-white">Our Mission</h4>
                  <p className="text-zinc-500 dark:text-zinc-500 text-sm">Empowering brands with digital-first strategies that deliver measurable results.</p>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2 dark:text-white">Our Vision</h4>
                  <p className="text-zinc-500 dark:text-zinc-500 text-sm">To be the catalyst for the next generation of digital-native market leaders.</p>
                </div>
              </div>
            </motion.div>
            <div className="relative">
              <div className="aspect-square bg-novyra-purple/5 rounded-3xl overflow-hidden brutalist-border-orange">
                <img 
                  src="https://picsum.photos/seed/agency/800/800" 
                  alt="Agency Life" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-novyra-orange p-8 rounded-2xl hidden md:block">
                <p className="text-white font-black text-4xl">100%</p>
                <p className="text-white/80 text-xs font-bold uppercase tracking-widest">Growth Focused</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-novyra-purple uppercase tracking-widest mb-4">Our Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold dark:text-white">Services We Provide</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => {
              const Icon = IconMap[service.icon];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:border-novyra-purple transition-all group"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="w-14 h-14 bg-novyra-purple/10 rounded-xl flex items-center justify-center text-novyra-purple mb-6 group-hover:bg-novyra-purple group-hover:text-white transition-all cursor-pointer"
                  >
                    <Icon size={28} />
                  </motion.div>
                  <h4 className="text-xl font-bold mb-4 dark:text-white">{service.title}</h4>
                  <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-novyra-purple uppercase tracking-widest mb-4">The Experts</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold dark:text-white">Meet Our Team</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TEAM.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="aspect-[4/5] bg-zinc-100 dark:bg-zinc-800 rounded-3xl overflow-hidden mb-6 relative">
                  <img 
                    src={`https://picsum.photos/seed/${member.name}/600/800`} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-novyra-purple/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <div className="flex gap-4">
                      <Instagram className="text-white cursor-pointer hover:text-novyra-orange" size={20} />
                      <Linkedin className="text-white cursor-pointer hover:text-novyra-orange" size={20} />
                      <Twitter className="text-white cursor-pointer hover:text-novyra-orange" size={20} />
                    </div>
                  </div>
                </div>
                <h4 className="text-2xl font-bold mb-1 dark:text-white">{member.name}</h4>
                <p className="text-novyra-purple font-medium mb-4">{member.role}</p>
                <ul className="space-y-2">
                  {member.tasks.map((task, tidx) => (
                    <li key={tidx} className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-novyra-orange rounded-full" />
                      {task}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-24 bg-zinc-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="text-sm font-bold text-novyra-orange uppercase tracking-widest mb-4">Portfolio</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold">Recent Projects</h3>
            </div>
            <p className="max-w-md text-zinc-400">
              A glimpse into how we transform digital presence for businesses across various industries.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {PORTFOLIO.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black">
                      <ArrowRight size={24} />
                    </div>
                  </div>
                </div>
                <p className="text-novyra-orange text-sm font-bold uppercase tracking-widest mb-2">{item.category}</p>
                <h4 className="text-2xl font-bold mb-2">{item.title}</h4>
                <p className="text-zinc-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-novyra-purple uppercase tracking-widest mb-4">Our Process</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold dark:text-white">How We Work</h3>
          </div>
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-zinc-100 dark:bg-zinc-800 -translate-y-1/2 z-0" />
            {[
              { step: "01", title: "Audit", desc: "Deep dive into your current presence." },
              { step: "02", title: "Strategy", desc: "Custom roadmap for your growth." },
              { step: "03", title: "Execution", desc: "Bringing the vision to life." },
              { step: "04", title: "Growth", desc: "Scaling and optimizing results." }
            ].map((item, idx) => (
              <div key={idx} className="relative z-10 bg-white dark:bg-zinc-900 p-6 text-center rounded-2xl border border-transparent dark:border-zinc-800">
                <div className="w-16 h-16 bg-novyra-purple text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-6 brutalist-border">
                  {item.step}
                </div>
                <h4 className="text-xl font-bold mb-2 dark:text-white">{item.title}</h4>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-novyra-purple uppercase tracking-widest mb-4">Pricing</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold dark:text-white">Choose Your Package</h3>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {PRICING.map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 flex flex-col ${pkg.color} ${idx === 1 ? 'ring-2 ring-novyra-orange scale-105 z-10' : ''}`}
              >
                {idx === 1 && (
                  <span className="bg-novyra-orange text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-6">Most Popular</span>
                )}
                <h4 className="text-2xl font-bold mb-2 dark:text-white">{pkg.name}</h4>
                <p className="text-novyra-purple font-bold text-lg mb-8">{pkg.price}</p>
                <ul className="space-y-4 mb-10 flex-grow">
                  {pkg.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400">
                      <CheckCircle2 className="text-novyra-orange shrink-0 mt-1" size={18} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Best For</p>
                  <p className="text-sm font-medium mb-8 dark:text-zinc-300">{pkg.bestFor}</p>
                  <button className={`w-full py-4 rounded-xl font-bold transition-all ${idx === 1 ? 'bg-novyra-orange text-white hover:bg-black dark:hover:bg-white dark:hover:text-black' : 'bg-novyra-purple text-white hover:bg-novyra-orange'}`}>
                    Get Started
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Novyra */}
      <section className="py-24 bg-novyra-purple text-white dark:bg-novyra-purple/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold text-novyra-orange uppercase tracking-widest mb-4">Why Novyra?</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold mb-8">The Novyra Advantage</h3>
              <div className="space-y-8">
                {[
                  { title: "Young & Creative", desc: "We speak the language of the internet and stay ahead of trends." },
                  { title: "Consistent", desc: "Reliability is our middle name. We deliver on time, every time." },
                  { title: "Strategic", desc: "Every post, every pixel, and every line of code has a purpose." },
                  { title: "Partnership Mindset", desc: "We don't just work for you; we work with you for long-term success." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-novyra-orange shrink-0">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-white/60">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 p-12 rounded-3xl border border-white/10 backdrop-blur-sm">
              <h4 className="text-3xl font-display font-bold mb-6">Ready to grow?</h4>
              <p className="text-white/70 mb-10">Let's discuss how we can take your brand to the next level.</p>
              <form className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 focus:outline-none focus:border-novyra-orange transition-colors" />
                <input type="email" placeholder="Email Address" className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 focus:outline-none focus:border-novyra-orange transition-colors" />
                <textarea placeholder="Tell us about your project" rows={4} className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 focus:outline-none focus:border-novyra-orange transition-colors"></textarea>
                <button className="w-full bg-novyra-orange text-white py-4 rounded-xl font-bold hover:bg-white hover:text-novyra-purple transition-all">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 text-white py-20 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <img 
                    src="/logo.jpg" 
                    alt="Novyra Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-2xl font-display font-bold tracking-tighter">NOVYRA</span>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mb-8">
                Building digital brands that matter. From social media to web development, we are your growth partner.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-novyra-purple transition-colors cursor-pointer">
                  <Instagram size={18} />
                </div>
                <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-novyra-purple transition-colors cursor-pointer">
                  <Linkedin size={18} />
                </div>
                <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center hover:bg-novyra-purple transition-colors cursor-pointer">
                  <Twitter size={18} />
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-bold mb-6">Quick Links</h5>
              <ul className="space-y-4 text-zinc-500 dark:text-zinc-400 text-sm">
                <li><a href="#about" className="hover:text-white transition-colors">Who We Are</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6">Contact</h5>
              <ul className="space-y-4 text-zinc-500 dark:text-zinc-400 text-sm">
                <li>hello@novyra.agency</li>
                <li>+1 (555) 000-0000</li>
                <li>Digital First, Global Reach</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-600 dark:text-zinc-500 text-xs">© 2024 Novyra Digital Agency. All rights reserved.</p>
            <div className="flex gap-8 text-zinc-600 dark:text-zinc-500 text-xs">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
