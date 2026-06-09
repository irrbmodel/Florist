import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ShoppingBag, Menu, X, ArrowDownRight, ArrowUpRight, 
  Sparkles, Mail, Phone, MapPin, Heart
} from 'lucide-react';

const Instagram = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Facebook = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

// Custom component imports

import ScrollReveal from './components/ScrollReveal';
import ProductModal from './components/ProductModal';
import BouquetBuilder from './components/BouquetBuilder';



// Curated Unsplash images for products & sections
const PRODUCTS = [
  {
    id: 1,
    title: 'The Ethereal Classic',
    botanical: 'Rosa centifolia & Ranunculus',
    price: 88.00,
    category: 'Signature Bouquets',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=900&q=80',
    description: 'A luxurious ensemble of David Austin garden roses, delicate white ranunculus, white hydrangeas, and soft eucalyptus branches. Curated in a classic rounded silhouette that radiates timeless grace, perfect for making a grand, romantic gesture.'
  },
  {
    id: 2,
    title: 'L’Orangerie Wild',
    botanical: 'Cymbidium & Helianthus',
    price: 95.00,
    category: 'Signature Bouquets',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=80',
    description: 'An organic, wild gathering of golden ranunculus, burnt-orange cymbidium orchids, seed eucalyptus, and wild field flowers. Creates an impression of walking through a sun-drenched orange grove in early autumn.'
  },
  {
    id: 3,
    title: 'Alabaster Solace',
    botanical: 'Hydrangea macrophylla & Anemone',
    price: 82.00,
    category: 'Signature Bouquets',
    image: 'https://images.unsplash.com/photo-1533604131411-3f23a17c0894?auto=format&fit=crop&w=900&q=80',
    description: 'A calming curation of heavy snow-white hydrangeas, deep-centered anemones, and white veronica. Designed to evoke stillness, elegance, and pure botanical clean lines.'
  },
  {
    id: 4,
    title: 'The Pampas Hearth',
    botanical: 'Cortaderia selloana & Banksia',
    price: 68.00,
    category: 'Dried Arrangements',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
    description: 'A curated dried arrangement featuring statement banksia proteas, plumes of sand-colored pampas grass, cotton pods, and bleached ruscus leaves. Designed to bring sustainable, eternal warmth into your interior space.'
  },
  {
    id: 5,
    title: 'Sienna Terracotta',
    botanical: 'Eucalyptus cinerea & Strelitzia',
    price: 74.00,
    category: 'Dried Arrangements',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80',
    description: 'A sculptural compilation of burnt sienna palm fans, cinnamon-dyed eucalyptus branches, and exotic dried flora details. Perfect for minimalist ceramic vases.'
  },
  {
    id: 6,
    title: 'Aether Ceramic',
    botanical: 'Vessel handblown & glazed',
    price: 48.00,
    category: 'Luxury Vessels',
    image: 'https://images.unsplash.com/photo-1527069014604-b5293128cf9f?auto=format&fit=crop&w=900&q=80',
    description: 'A hand-thrown raw stoneware vessel with an organic sand-speckled glaze. Specifically designed to let stems drape naturally in contemporary editorial form.'
  },
  {
    id: 7,
    title: 'Alabaster Urn',
    botanical: 'Porcelain botanical cylinder',
    price: 110.00,
    category: 'Luxury Vessels',
    image: 'https://images.unsplash.com/photo-1447875226534-2936fdc0abbb?auto=format&fit=crop&w=900&q=80',
    description: 'A majestic porcelain vase with a matte alabaster coating. It provides a heavy, supportive base for sprawling branches and grand floral curate ensembles.'
  },
  {
    id: 8,
    title: 'The Curator Chest',
    botanical: 'Bespoke floristry kit',
    price: 130.00,
    category: 'Botanical Gift Boxes',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=900&q=80',
    description: 'A luxury wooden casket containing Japanese steel florist shears, botanical hydration spray, custom copper pin frog, organic flower nutrients, and step-by-step styling cards.'
  }
];

const GALLERY_SLIDES = [
  { url: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=900&q=80', title: 'The Atelier Workspace' },
  { url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=80', title: 'Curating Ethereal Grace' },
  { url: 'https://images.unsplash.com/photo-1527069014604-b5293128cf9f?auto=format&fit=crop&w=900&q=80', title: 'Minimalist Vessels' },
  { url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80', title: 'Sustainable Dried Grasses' },
  { url: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=900&q=80', title: 'Signature Bloom Storage' }
];

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Parallax scroll effects for Hero
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  // Categories extraction
  const categories = ['All', 'Signature Bouquets', 'Dried Arrangements', 'Luxury Vessels', 'Botanical Gift Boxes'];

  const filteredProducts = selectedCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const openProductDetails = (product) => {
    setActiveProduct(product);
    setIsModalOpen(true);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <>
      {/* Immersive Elements */}

      {/* Fullscreen Sliding Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="fixed inset-0 z-40 bg-brand-olive text-brand-cream flex flex-col justify-between p-8 md:p-16"
          >
            {/* Header copy in menu */}
            <div className="flex justify-between items-center border-b border-brand-cream/10 pb-6">
              <span className="text-xl font-serif tracking-wider">FLEUR L’ATELIER</span>
              <button 
                onClick={() => setIsMenuOpen(false)} 
                          className="w-12 h-12 rounded-full border border-brand-cream/20 flex items-center justify-center hover:bg-brand-cream hover:text-brand-olive transition-colors duration-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center my-auto">
              <div className="space-y-4 md:space-y-6">
                {[
                  { label: 'The Curation', id: '#shop' },
                  { label: 'Bespoke Builder', id: '#builder' },
                  { label: 'Philosophy', id: '#philosophy' },
                  { label: 'Subscriptions', id: '#subscriptions' },
                ].map((item, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={item.label}
                  >
                    <a
                      href={item.id}
                      onClick={() => setIsMenuOpen(false)}
                                      className="text-4xl md:text-6xl font-serif hover:text-brand-gold transition-colors duration-300 block py-1"
                    >
                      {item.label}
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Menu Editorial Contact details */}
              <div className="space-y-8 text-brand-cream/80 border-t md:border-t-0 md:border-l border-brand-cream/10 pt-8 md:pt-0 md:pl-16">
                <div>
                  <h4 className="text-[10px] font-display uppercase tracking-widest text-brand-gold font-bold mb-2">The Studio</h4>
                  <p className="font-serif text-lg leading-relaxed">
                    17 Rue de l'Orangerie<br />
                    75004, Paris, France
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-display uppercase tracking-widest text-brand-gold font-bold mb-2">Contact</h4>
                  <p className="font-serif text-lg">
                    hello@fleuratelier.com<br />
                    +33 1 42 78 90 12
                  </p>
                </div>
                <div className="flex gap-4">
                  <a href="#instagram"  className="hover:text-brand-gold transition-colors duration-300"><Instagram className="w-5 h-5" /></a>
                  <a href="#facebook"  className="hover:text-brand-gold transition-colors duration-300"><Facebook className="w-5 h-5" /></a>
                </div>
              </div>
            </div>

            {/* Bottom details */}
            <div className="border-t border-brand-cream/10 pt-6 flex justify-between items-center text-xs text-brand-cream/60 font-sans">
              <span>© 2026 Fleur L'Atelier. All rights reserved.</span>
              <span className="italic font-serif">Writings in Petals</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-brand-cream/80 backdrop-blur-md border-b border-brand-olive/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex justify-between items-center">
          {/* Menu Trigger Left */}
          <button 
            onClick={() => setIsMenuOpen(true)}
                  className="flex items-center gap-3 font-display uppercase text-xs tracking-widest font-bold text-brand-olive cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full border border-brand-olive/10 flex items-center justify-center group-hover:bg-brand-olive group-hover:text-brand-cream transition-colors duration-300">
              <Menu className="w-3.5 h-3.5" />
            </div>
            <span className="hidden sm:inline">Menu</span>
          </button>

          {/* Center Brand Name */}
          <a 
            href="#" 
                        className="text-2xl md:text-3xl font-serif text-brand-olive tracking-widest font-light"
          >
            FLEUR L’ATELIER
          </a>

          {/* Cart Right */}
          <button 
            onClick={() => setCartCount(prev => prev + 1)}
                  className="flex items-center gap-2 font-display uppercase text-xs tracking-widest font-bold text-brand-olive cursor-pointer relative group"
            data-cursor-text="ADD"
          >
            <span className="hidden sm:inline">Vessel Bag</span>
            <div className="w-8 h-8 rounded-full border border-brand-olive/10 flex items-center justify-center group-hover:bg-brand-olive group-hover:text-brand-cream transition-colors duration-300 relative">
              <ShoppingBag className="w-3.5 h-3.5" />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-brand-gold text-brand-charcoal text-[9px] font-bold rounded-full flex items-center justify-center border border-brand-cream"
                >
                  {cartCount}
                </motion.span>
              )}
            </div>
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section 
        ref={heroRef}
        className="relative min-h-screen bg-brand-cream flex flex-col justify-between pt-32 pb-12 overflow-hidden px-6 md:px-12"
      >
        {/* Parallax elements */}
        <div className="absolute top-1/4 left-10 w-[200px] h-[200px] rounded-full bg-brand-rose/30 filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-[300px] h-[300px] rounded-full bg-brand-sage/20 filter blur-3xl pointer-events-none" />

        <div />

        {/* Central Core Content */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Text */}
          <div className="lg:col-span-6 space-y-8">
            <ScrollReveal variant="text-reveal-words" animateOnMount={true} className="text-5xl md:text-7xl lg:text-8xl font-serif text-brand-olive font-medium leading-none tracking-tight">
              Poetry Written In Petals
            </ScrollReveal>
                  <ScrollReveal variant="slide-up" animateOnMount={true} delay={0.4} className="space-y-6 max-w-lg">
              <p className="text-brand-charcoal/70 text-sm md:text-base leading-relaxed">
                Haute couture floristry crafted in Paris. We compose structural living artwork that elevates residential spaces, fashion editorials, and intimate gatherings.
              </p>
                      <div className="flex gap-4">
                <a 
                  href="#shop" 
                                          className="inline-flex items-center gap-2 bg-brand-olive text-brand-cream hover:bg-brand-charcoal px-6 py-3.5 rounded-full font-display uppercase text-[10px] tracking-widest font-bold transition-colors shadow-sm cursor-pointer"
                >
                  Explore Collection
                  <ArrowDownRight className="w-4 h-4" />
                </a>
                <a 
                  href="#builder" 
                                          className="inline-flex items-center gap-2 border border-brand-olive/20 hover:border-brand-olive px-6 py-3.5 rounded-full font-display uppercase text-[10px] tracking-widest font-bold text-brand-olive transition-colors cursor-pointer"
                >
                  Bespoke Design
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Parallax Hero Image Card */}
          <motion.div 
            style={{ y: heroImageY }}
            className="lg:col-span-6 flex justify-center lg:justify-end relative"
          >
            <ScrollReveal variant="reveal-mask" animateOnMount={true} duration={1.2} className="w-full max-w-md aspect-3/4 rounded-2xl shadow-xl relative group">
              <img
                src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=80"
                alt="Floristry creation"
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-2000 ease-out"
              />
              <div className="absolute inset-0 bg-brand-olive/5" />
            </ScrollReveal>

            {/* Tiny Floating Detail Card */}
            <motion.div 
              style={{ y: heroTextY }}
              className="absolute -bottom-6 -left-6 bg-brand-cream/95 backdrop-blur-md p-4 rounded-xl border border-brand-olive/10 shadow-lg max-w-[200px] hidden md:block"
            >
              <span className="text-[9px] font-display uppercase tracking-widest text-brand-sage font-bold block mb-1">Current Composition</span>
              <p className="font-serif text-sm text-brand-olive italic leading-snug">"The Midnight Grace" featuring Wild Ranunculus</p>
            </motion.div>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center border-t border-brand-olive/10 pt-6 mt-12 relative z-10 text-[10px] font-display uppercase tracking-widest text-brand-sage font-bold">
          <span>Paris — Milan — New York</span>
          <a href="#shop"   className="flex items-center gap-1 hover:text-brand-olive transition-colors cursor-pointer">
            Scroll to curations <ArrowDownRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* CURATOR SHOWCASE (SHOP SECTION) */}
      <section className="py-24 border-t border-brand-olive/5 bg-brand-cream" id="shop">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
              {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="space-y-4">
              <span className="text-xs font-display uppercase tracking-widest text-brand-sage font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-gold" />
                The Curator Showcase
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-olive font-medium">
                Seasonal Botanical Curations
              </h2>
            </div>
                  {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 pt-2 border-b border-brand-olive/5 w-full md:w-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                              className={`px-4 py-2 text-xs font-display uppercase tracking-wider font-bold rounded-full transition-all duration-300 cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-brand-olive text-brand-cream shadow-sm'
                      : 'text-brand-sage hover:text-brand-olive hover:bg-brand-rose/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Organic Editorial Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 items-start"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className={`group space-y-4 ${
                    idx % 2 === 1 ? 'md:mt-8' : '' // Awwwards editorial style vertical offset
                  }`}
                >
                  {/* Image Container with custom zoom */}
                  <div 
                    onClick={() => openProductDetails(product)}
                                  className="aspect-3/4 w-full rounded-xl overflow-hidden border border-brand-olive/5 shadow-sm relative group cursor-pointer"
                    data-cursor-text="VIEW"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-1200 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-brand-olive/0 group-hover:bg-brand-olive/5 transition-colors duration-300" />
                  </div>

                  {/* Labels */}
                  <div className="flex justify-between items-start pt-2">
                    <div>
                      <h3 
                        onClick={() => openProductDetails(product)}
                        className="text-lg font-serif text-brand-olive hover:text-brand-gold cursor-pointer leading-snug transition-colors duration-300"
                      >
                        {product.title}
                      </h3>
                      <p className="text-[11px] font-serif italic text-brand-sage">
                        {product.botanical}
                      </p>
                    </div>
                    <span className="font-serif text-brand-olive font-medium">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* INTERACTIVE BOUQUET BUILDER */}
      <BouquetBuilder />

      {/* PHILOSOPHY & STORY SECTION */}
      <section className="py-24 bg-brand-olive text-brand-cream relative overflow-hidden" id="philosophy">
        {/* Background shapes */}
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-brand-sage/5 filter blur-3xl pointer-events-none -ml-40" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                  {/* Left Narrative with word reveal */}
            <div className="lg:col-span-7 space-y-8">
              <span className="text-xs font-display uppercase tracking-widest text-brand-gold font-bold">
                Our Living Creed
              </span>
              <ScrollReveal variant="text-reveal-words" className="text-3xl md:text-5xl font-serif leading-tight font-medium text-brand-rose">
                We believe flowers are not mere decorations but dynamic, fleeting dialogues between human emotion and the seasonal architecture of earth.
              </ScrollReveal>
                      <ScrollReveal variant="slide-up" delay={0.2} className="space-y-6 text-brand-cream/80 text-sm md:text-base leading-relaxed font-sans max-w-xl">
                <p>
                  Sourcing strictly from organic flower farms in Provence, the Loire Valley, and family greenhouses, we honor the natural growth contours of each bloom.
                </p>
                <p>
                  Our florists design without restrictive wiring or plastics. Stems are layered inside customized vessel molds to let floral forms fall naturally, showcasing their unique asymmetries and raw silhouettes.
                </p>
                <a 
                  href="#instagram"
                                          className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-cream border-b border-brand-gold/30 hover:border-brand-cream pb-1 text-xs font-display uppercase tracking-wider font-bold transition-all cursor-pointer"
                >
                  Inside the Greenhouse Atelier
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </ScrollReveal>
            </div>

            {/* Right Stacked Editorial Images */}
            <div className="lg:col-span-5 grid grid-cols-12 gap-4 relative">
              <div className="col-span-8 relative z-10">
                <ScrollReveal variant="reveal-mask" duration={1} className="rounded-xl overflow-hidden aspect-4/5 border border-brand-cream/5 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=800&q=80"
                    alt="Greenhouse interior"
                    className="w-full h-full object-cover"
                  />
                </ScrollReveal>
              </div>
              <div className="col-span-6 col-start-7 -mt-24 relative z-20">
                <ScrollReveal variant="reveal-mask" duration={1.2} delay={0.2} className="rounded-xl overflow-hidden aspect-4/5 border border-brand-cream/10 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1527069014604-b5293128cf9f?auto=format&fit=crop&w=800&q=80"
                    alt="Vase arranging"
                    className="w-full h-full object-cover animate-pulse-slow"
                  />
                </ScrollReveal>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MEMBERSHIPS / SUBSCRIPTION SECTION */}
      <section className="py-24 bg-brand-cream" id="subscriptions">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
              {/* Section Headers */}
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-display uppercase tracking-widest text-brand-sage font-bold">
              Sublime Rituals
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-olive font-medium">
              Aetheria Subscription Service
            </h2>
            <p className="max-w-md mx-auto text-brand-charcoal/60 text-sm">
              Deliver structural floral curation into your corporate spaces or residential hearths on a weekly or bi-weekly cadence.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {[
              {
                title: 'The Stem Collection',
                price: '65',
                cycle: 'per shipment',
                features: ['Fresh local loose seasonal blooms', 'Delivered in wet wraps with stem prep guide', 'Complimentary curated flower food pack', 'Bi-weekly delivery schedule'],
                tier: 'Ideal for home styling tables',
                btnText: 'Subscribe Classical'
              },
              {
                title: 'The Atelier Curation',
                price: '110',
                cycle: 'per shipment',
                features: ['Complete arranged designer bouquet', 'Pre-conditioned, cut, and balanced', 'Rotational premium glass vase borrow', 'Weekly or bi-weekly delivery options', 'Dedicated floral stylist advice'],
                tier: 'Most Requested',
                btnText: 'Subscribe Haute Couture',
                popular: true
              },
              {
                title: 'La Grandeur Curation',
                price: '220',
                cycle: 'per shipment',
                features: ['Large monumental architectural stems', 'Full designer vase setup by a stylist in-situ', 'Perfect for executive offices or lobbies', 'Vessel swaps with every delivery', 'Priority customized flower selections'],
                tier: 'Elite architectural statements',
                btnText: 'Request Atelier Consult'
              }
            ].map((plan, idx) => (
              <ScrollReveal 
                key={plan.title} 
                variant="slide-up" 
                delay={idx * 0.1}
                className={`flex flex-col justify-between p-8 rounded-2xl border transition-all duration-500 relative ${
                  plan.popular 
                    ? 'border-brand-olive bg-white shadow-md scale-[1.01]' 
                    : 'border-brand-olive/10 bg-white/30 hover:border-brand-olive/30'
                }`}
              >
                {plan.popular && (
                  <span className="absolute top-4 right-4 bg-brand-gold text-brand-charcoal text-[9px] font-display uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-full">
                    Atelier Choice
                  </span>
                )}
                          <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-serif text-brand-olive">{plan.title}</h3>
                    <p className="text-[11px] text-brand-sage font-display uppercase font-bold mt-1 tracking-wider">{plan.tier}</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-serif text-brand-olive font-medium">${plan.price}</span>
                    <span className="text-xs text-brand-sage">{plan.cycle}</span>
                  </div>

                  <hr className="border-brand-olive/5" />

                  <ul className="space-y-3">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-xs text-brand-charcoal/80">
                        <span className="w-4 h-4 rounded-full bg-brand-olive/5 flex items-center justify-center text-[9px] mt-0.5 shrink-0">✔</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => setCartCount(prev => prev + 1)}
                                  className={`w-full py-3 rounded-full font-display uppercase text-[10px] tracking-widest font-bold shadow-sm transition-colors duration-300 cursor-pointer ${
                      plan.popular 
                        ? 'bg-brand-olive text-brand-cream hover:bg-brand-charcoal' 
                        : 'border border-brand-olive/20 text-brand-olive hover:bg-brand-rose/20'
                    }`}
                  >
                    {plan.btnText}
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* LIVING CANVAS DRAGGABLE GALLERY */}
      <section className="py-24 bg-brand-cream overflow-hidden border-t border-brand-olive/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 flex justify-between items-end">
          <div className="space-y-2">
            <span className="text-xs font-display uppercase tracking-widest text-brand-sage font-bold">
              Immersive Vibe
            </span>
            <h2 className="text-4xl font-serif text-brand-olive font-medium">
              The Living Canvas
            </h2>
          </div>
          <span className="text-xs font-display uppercase tracking-widest text-brand-sage font-bold hidden sm:inline">
            ✦ Drag to Browse Gallery
          </span>
        </div>

        {/* Drag Container */}
        <div className="w-full cursor-grab active:cursor-grabbing">
          <motion.div 
            drag="x"
            dragConstraints={{ left: -600, right: 0 }}
            className="flex gap-6 px-6 md:px-12 w-max"
            data-cursor-text="DRAG"
          >
            {GALLERY_SLIDES.map((slide, idx) => (
              <motion.div 
                key={idx}
                className="w-[300px] md:w-[400px] shrink-0 space-y-4"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-sm border border-brand-olive/5 relative">
                  <img
                    src={slide.url}
                    alt={slide.title}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-brand-olive/5" />
                </div>
                <div className="flex justify-between items-center px-1">
                  <span className="text-xs font-display uppercase tracking-widest text-brand-sage font-bold">{slide.title}</span>
                  <span className="text-xs font-serif text-brand-olive italic">Paris Studio</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* EDITORIAL CONTACT & FOOTER */}
      <footer className="bg-brand-olive text-brand-cream pt-24 pb-12 relative overflow-hidden" id="contact">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                  {/* Left: Newsletter signup */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-3xl md:text-4xl font-serif text-brand-rose leading-tight font-medium">
                Subscribe to Seasonal Curations, Floristry Narratives, & Secret Atelier Launches.
              </h3>
                      <form onSubmit={handleNewsletterSubmit} className="space-y-4 max-w-md relative">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-transparent border-b border-brand-cream/20 focus:border-brand-gold py-3 px-1 text-sm font-sans focus:outline-none placeholder:text-brand-cream/40 transition-colors duration-300"
                  />
                  <button 
                    type="submit" 
                                  className="absolute right-0 top-3 text-brand-gold hover:text-brand-cream text-xs font-display uppercase font-bold tracking-widest transition-colors cursor-pointer"
                  >
                    Join
                  </button>
                </div>
                          <AnimatePresence>
                  {isSubscribed && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-brand-gold"
                    >
                      ✦ Gratitude. Welcome to the Atelier Circle.
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </div>

            {/* Right: Contact & Studio Info Links */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-8">
                      <div className="space-y-4 text-xs font-sans">
                <span className="text-[10px] font-display uppercase tracking-widest text-brand-gold font-bold block mb-1">
                  Atelier Hours
                </span>
                <p className="text-brand-cream/70 leading-relaxed">
                  Monday — Friday<br />
                  09:00 AM — 06:00 PM CET
                </p>
                <p className="text-brand-cream/70 leading-relaxed">
                  Saturday — Sunday<br />
                  10:00 AM — 04:00 PM CET
                </p>
              </div>

              <div className="space-y-4 text-xs font-sans">
                <span className="text-[10px] font-display uppercase tracking-widest text-brand-gold font-bold block mb-1">
                  Connect
                </span>
                <ul className="space-y-2">
                  <li>
                    <a href="#instagram"  className="hover:text-brand-gold flex items-center gap-1 transition-colors duration-300">
                      Instagram <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a href="#pinterest"  className="hover:text-brand-gold flex items-center gap-1 transition-colors duration-300">
                      Pinterest <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a href="#contact-form"  className="hover:text-brand-gold flex items-center gap-1 transition-colors duration-300">
                      Contact Studio <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </li>
                </ul>
              </div>

            </div>

          </div>

          {/* Large Stylized Logo Watermark at bottom */}
          <div className="border-t border-brand-cream/10 pt-16 mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-[10px] font-display uppercase tracking-widest text-brand-cream/40">
              © 2026 Fleur L'Atelier | Created in Haute Couture Design.
            </span>
            <div className="flex gap-6 text-xs text-brand-cream/60">
              <a href="#privacy"  className="hover:text-brand-gold transition-colors duration-300">Privacy Policy</a>
              <a href="#terms"  className="hover:text-brand-gold transition-colors duration-300">Terms of Service</a>
            </div>
          </div>

          <div className="select-none pointer-events-none text-center pt-8 opacity-5">
            <h1 className="text-[14vw] font-serif uppercase tracking-widest leading-none m-0 p-0 text-brand-cream">
              FLEUR
            </h1>
          </div>

        </div>
      </footer>

      {/* Product Detail Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={activeProduct}
      />
    </>
  );
};

export default App;