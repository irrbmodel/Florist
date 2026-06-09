import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CHRONICLES = [
  {
    id: 'intro',
    title: 'The Botanical Chronology',
    subtitle: 'A Bengal Narrative',
    description: 'Each quarter, Fleur L’Atelier designs structural, fleeting dialogues inspired by seasonal architecture. Read our current vignettes across Kolkata, West Bengal.',
    type: 'text'
  },
  {
    id: 'spring',
    season: 'Spring / Awakening',
    title: 'Alabaster Anemone',
    coordinates: '22.5726° N, 88.3639° E',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=900&q=80',
    description: 'Fine layers of white anemones, heavy snow hydrangeas, and soft eucalyptus twigs. Sourced from the Himalayan foothills.'
  },
  {
    id: 'summer',
    season: 'Summer / Solar Bloom',
    title: 'L’Orangerie Gold',
    coordinates: '22.5626° N, 88.3939° E',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=80',
    description: 'Vibrant sunflowers, honey wheat, and wild orange orchids. Inspired by the sun-drenched valleys of Bengal.'
  },
  {
    id: 'autumn',
    season: 'Autumn / Sienna Hearth',
    title: 'Pampas Rust',
    coordinates: '22.5826° N, 88.3439° E',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
    description: 'Sustainable dried plumes, sienna-dyed eucalyptus fans, and hand-thrown raw stoneware vessels from local artisans.'
  }
];

export const HorizontalShowcase = () => {
  const containerRef = useRef(null);

  // Track vertical scroll position of this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Map vertical scroll progress to horizontal offset (4 slides total, translate x)
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-72%']);

  // Parallax zoom for images: start slightly zoomed, scale back as we scroll past
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 0.98]);

  return (
    <div ref={containerRef} className="relative h-[280vh] bg-brand-olive text-brand-cream" id="chronicles">
      {/* Sticky viewport frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        
        {/* Floating coordinate decoration watermark */}
        <div className="absolute top-24 left-8 md:left-16 text-[9px] font-display uppercase tracking-widest text-brand-gold/40 font-bold z-10 hidden sm:block">
          ✦ Live Vignettes // 22.57° N, 88.36° E
        </div>

        <motion.div style={{ x }} className="flex h-[75vh] items-center pl-6 md:pl-24 pr-24">
          
          {CHRONICLES.map((slide) => (
            <div
              key={slide.id}
              className={`h-full shrink-0 flex items-center justify-between gap-8 md:gap-16 mr-20 md:mr-36 ${
                slide.type === 'text' 
                  ? 'w-[280px] md:w-[420px]' 
                  : 'w-[85vw] md:w-[700px]'
              }`}
            >
              {slide.type === 'text' ? (
                // Text Introductory Slide
                <div className="space-y-6 flex flex-col justify-center">
                  <span className="text-[10px] font-display uppercase tracking-widest text-brand-gold font-bold">
                    {slide.subtitle}
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-rose leading-tight font-medium">
                    {slide.title}
                  </h2>
                  <p className="text-xs md:text-sm text-brand-cream/70 leading-relaxed font-sans">
                    {slide.description}
                  </p>
                  <div className="flex items-center gap-2 pt-2 text-[10px] font-display uppercase tracking-wider text-brand-gold font-semibold">
                    <span className="animate-pulse">✦ Scroll to discover</span>
                  </div>
                </div>
              ) : (
                // Horizontal Image Slide
                <div className="w-full h-full grid grid-cols-12 items-center gap-6 md:gap-12 relative group">
                  {/* Info details */}
                  <div className="col-span-12 md:col-span-5 space-y-4 md:space-y-6 order-2 md:order-1">
                    <span className="text-[9px] font-display uppercase tracking-widest text-brand-gold font-bold block">
                      {slide.season}
                    </span>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-brand-rose font-medium leading-none">
                      {slide.title}
                    </h3>
                    <p className="text-xs text-brand-cream/65 leading-relaxed font-sans max-w-xs">
                      {slide.description}
                    </p>
                    <div className="border-t border-brand-cream/10 pt-4 flex justify-between items-center text-[9px] font-sans text-brand-gold/60 font-semibold uppercase tracking-wider">
                      <span>Coordinates</span>
                      <span>{slide.coordinates}</span>
                    </div>
                  </div>

                  {/* Parallax Image Mask */}
                  <div className="col-span-12 md:col-span-7 h-[38vh] md:h-full rounded-2xl overflow-hidden shadow-2xl relative order-1 md:order-2 border border-brand-cream/5">
                    <motion.img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                      style={{ scale }}
                      transition={{ ease: [0.16, 1, 0.3, 1] }}
                    />
                    <div className="absolute inset-0 bg-brand-olive/5 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
                  </div>
                </div>
              )}
            </div>
          ))}

        </motion.div>

        {/* Dynamic page bottom details indicator */}
        <div className="absolute bottom-12 left-8 md:left-16 text-[9px] font-display uppercase tracking-widest text-brand-sage font-bold z-10 hidden sm:block">
          FLEUR CHRONICLES — VOLUME I
        </div>
      </div>
    </div>
  );
};

export default HorizontalShowcase;
