import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, RotateCcw, ShoppingBag, Heart, Sparkles, ArrowRight } from 'lucide-react';

// Custom animated SVG composite representing the client's current florist selections
const BouquetGraphic = ({ mood, blooms, wrap }) => {
  const moodColor = mood?.accentColor || '#C5A880';
  
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={mood ? `${moodColor}33` : 'rgba(197, 168, 128, 0.15)'} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill="url(#glow)" rx="12" />

      {/* Stem Lines */}
      {blooms.length > 0 && (
        <g opacity="0.85">
          {blooms.map((bloom, index) => {
            const targetX = [160, 200, 240][index % 3];
            const targetY = [155, 120, 165][index % 3];
            return (
              <motion.path
                key={`stem-${bloom.id}`}
                d={`M ${targetX} ${targetY} Q ${(200 + targetX) / 2} 250 200 310`}
                stroke="#5B6D56"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />
            );
          })}
          {/* General foliage stems */}
          <motion.path
            d="M 140 180 Q 170 260 200 310"
            stroke="#7C8D78"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
          />
          <motion.path
            d="M 260 180 Q 230 260 200 310"
            stroke="#7C8D78"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
          />
        </g>
      )}

      {/* Stems Foliage Leaves */}
      {blooms.map((bloom, index) => {
        const targetX = [160, 200, 240][index % 3];
        const midX = (200 + targetX) / 2;
        
        return (
          <g key={`leaves-${bloom.id}`}>
            <motion.path
              d={`M ${midX - 8} 210 Q ${midX - 22} 200 ${midX - 18} 190 Q ${midX} 200 ${midX - 8} 210`}
              fill="#7C8D78"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15 }}
            />
            <motion.path
              d={`M ${midX + 8} 230 Q ${midX + 22} 220 ${midX + 18} 210 Q ${midX} 220 ${midX + 8} 230`}
              fill="#7C8D78"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.25 }}
            />
          </g>
        );
      })}

      {/* Flowers Layer */}
      {blooms.map((bloom, index) => {
        const targetX = [160, 200, 240][index % 3];
        const targetY = [155, 120, 165][index % 3];

        return (
          <motion.g
            key={`bloom-graphic-${bloom.id}-${index}`}
            transform={`translate(${targetX}, ${targetY})`}
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1.05, rotate: 0 }}
            transition={{ type: 'spring', damping: 14, stiffness: 120 }}
          >
            {bloom.id === 'rose' && (
              <g>
                <circle cx="0" cy="0" r="30" fill="#EFAAA4" />
                <circle cx="-6" cy="-6" r="18" fill="#F4BDB7" />
                <circle cx="6" cy="-6" r="18" fill="#F4BDB7" />
                <circle cx="0" cy="8" r="20" fill="#EE9C95" />
                <circle cx="-10" cy="0" r="16" fill="#F4BDB7" />
                <circle cx="12" cy="0" r="16" fill="#F4BDB7" />
                <circle cx="0" cy="0" r="11" fill="#D67B73" />
                <circle cx="0" cy="0" r="5" fill="#BD5F57" />
              </g>
            )}
            {bloom.id === 'tulip' && (
              <g transform="translate(0, -5)">
                <path d="M-20,18 C-20,-12 0,-25 0,-25 C0,-25 20,-12 20,18 C20,32 10,36 0,36 C-10,36 -20,32 -20,18 Z" fill="#E26D74" />
                <path d="M-12,18 C-12,-3 0,-18 0,-18 C0,-18 12,-3 12,18 C12,28 6,31 0,31 C-6,31 -12,28 -12,18 Z" fill="#EE8B91" />
                <path d="M-5,18 C-5,3 0,-12 0,-12 C0,-12 5,3 5,18 C5,22 2.5,25 0,25 C-2.5,25 -5,22 -5,18 Z" fill="#BD4E55" />
              </g>
            )}
            {bloom.id === 'ranunculus' && (
              <g>
                <circle cx="0" cy="0" r="28" fill="#EFA24C" />
                <circle cx="0" cy="0" r="23" fill="#F3B367" />
                <circle cx="0" cy="0" r="18" fill="#F6C582" />
                <circle cx="0" cy="0" r="13" fill="#EFA24C" />
                <circle cx="0" cy="0" r="8" fill="#D2842B" />
                <circle cx="0" cy="0" r="4" fill="#9F5B12" />
              </g>
            )}
            {bloom.id === 'peony' && (
              <g>
                <circle cx="0" cy="0" r="36" fill="#F5C0D3" />
                <path d="M-22,-22 Q-36,0 -22,22 Q0,36 22,22 Q36,0 22,-22 Q0,-36 -22,-22 Z" fill="#F7CAD9" />
                <circle cx="0" cy="0" r="24" fill="#F3A7C3" />
                <circle cx="0" cy="0" r="16" fill="#EC81AA" />
                <circle cx="0" cy="0" r="9" fill="#DA5387" />
                <circle cx="0" cy="0" r="3" fill="#B72D62" />
              </g>
            )}
            {bloom.id === 'hydrangea' && (
              <g>
                <circle cx="0" cy="0" r="38" fill="#90BFE6" opacity="0.85" />
                <circle cx="-14" cy="-14" r="11" fill="#B1D4F1" />
                <circle cx="14" cy="-14" r="11" fill="#B1D4F1" />
                <circle cx="-14" cy="14" r="11" fill="#B1D4F1" />
                <circle cx="14" cy="14" r="11" fill="#B1D4F1" />
                <circle cx="0" cy="-20" r="9" fill="#CDE3F7" />
                <circle cx="0" cy="20" r="9" fill="#CDE3F7" />
                <circle cx="-20" cy="0" r="9" fill="#CDE3F7" />
                <circle cx="20" cy="0" r="9" fill="#CDE3F7" />
                <circle cx="0" cy="0" r="13" fill="#B1D4F1" />
                <circle cx="0" cy="0" r="3" fill="#FDFBF7" />
              </g>
            )}
            {bloom.id === 'eucalyptus' && (
              <g>
                <line x1="0" y1="-25" x2="0" y2="25" stroke="#7C8D78" strokeWidth="3.5" />
                <ellipse cx="-10" cy="-12" rx="12" ry="8" fill="#9CB297" />
                <ellipse cx="10" cy="-12" rx="12" ry="8" fill="#9CB297" />
                <ellipse cx="-12" cy="4" rx="14" ry="9" fill="#8FA58A" />
                <ellipse cx="12" cy="4" rx="14" ry="9" fill="#8FA58A" />
                <ellipse cx="0" cy="-22" rx="7" ry="5" fill="#AFC4AB" />
              </g>
            )}
          </motion.g>
        );
      })}

      {/* Wrapping & Vessel Layer */}
      {wrap && (
        <g>
          {wrap.id === 'paper' && (
            <motion.g
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <polygon points="120,380 200,280 280,380 200,390" fill="#C2B095" stroke="#A79477" strokeWidth="1.5" />
              <polygon points="150,380 200,295 250,380" fill="#D3C3AA" />
              <circle cx="200" cy="320" r="4" fill="#695D4B" />
              <path d="M 200 320 Q 180 300 175 320 Q 185 330 200 320" stroke="#695D4B" strokeWidth="2" fill="none" />
              <path d="M 200 320 Q 220 300 225 320 Q 215 330 200 320" stroke="#695D4B" strokeWidth="2" fill="none" />
              <path d="M 200 320 L 192 345" stroke="#695D4B" strokeWidth="1.5" />
              <path d="M 200 320 L 206 345" stroke="#695D4B" strokeWidth="1.5" />
            </motion.g>
          )}

          {wrap.id === 'silk' && (
            <motion.g
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <path d="M 196 320 Q 175 350 165 390" stroke="#EADFD9" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M 204 320 Q 225 350 235 390" stroke="#EADFD9" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M 198 320 Q 192 355 188 395" stroke="#DED1C9" strokeWidth="3" strokeLinecap="round" fill="none" />
              <ellipse cx="184" cy="320" rx="14" ry="9" fill="#EADFD9" stroke="#D4C4BC" strokeWidth="1" />
              <ellipse cx="216" cy="320" rx="14" ry="9" fill="#EADFD9" stroke="#D4C4BC" strokeWidth="1" />
              <circle cx="200" cy="320" r="6" fill="#E4D3C9" />
            </motion.g>
          )}

          {wrap.id === 'glass' && (
            <motion.g
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 14 }}
            >
              <rect x="150" y="295" width="100" height="90" fill="rgba(177, 212, 241, 0.18)" rx="10" />
              <rect x="150" y="270" width="100" height="115" stroke="rgba(253, 251, 247, 0.4)" strokeWidth="4.5" fill="rgba(253, 251, 247, 0.12)" rx="12" />
              <rect x="150" y="270" width="100" height="115" stroke="rgba(28, 45, 31, 0.12)" strokeWidth="1.5" fill="none" rx="12" />
              <line x1="162" y1="285" x2="162" y2="365" stroke="rgba(253, 251, 247, 0.45)" strokeWidth="2" strokeLinecap="round" />
              <line x1="238" y1="290" x2="238" y2="340" stroke="rgba(253, 251, 247, 0.2)" strokeWidth="1" strokeLinecap="round" />
            </motion.g>
          )}
        </g>
      )}
    </svg>
  );
};

const BouquetBuilder = () => {
  const [step, setStep] = useState(1); // 1: Mood, 2: Blooms, 3: Wrap, 4: Summary

  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedBlooms, setSelectedBlooms] = useState([]);
  const [selectedWrap, setSelectedWrap] = useState(null);
  const [isOrdered, setIsOrdered] = useState(false);

  // Configuration Data
  const moods = [
    {
      id: 'ethereal',
      name: 'Ethereal Grace',
      tag: 'Pure & Serene',
      description: 'Pastel creams, pure white garden roses, and delicate gray-green foliage.',
      basePrice: 65,
      color: 'bg-[#F0ECE5]',
      accentColor: '#8D775F',
      imageUrl: 'https://images.unsplash.com/photo-1527069014604-b5293128cf9f?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'midnight',
      name: 'Midnight Romance',
      tag: 'Theatrical & Mysterious',
      description: 'Deep burgundy roses, velvet-purple orchids, and charcoal-tinted branches.',
      basePrice: 85,
      color: 'bg-[#2A2421]',
      accentColor: '#C5A880',
      imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'solstice',
      name: 'Sunlit Solstice',
      tag: 'Warm & Radiating',
      description: 'Rust dahlias, vibrant ranunculus, honey-colored grass, and wild wheat.',
      basePrice: 70,
      color: 'bg-[#F9ECE0]',
      accentColor: '#A86C32',
      imageUrl: 'https://images.unsplash.com/photo-1490750961118-9e6b52c36b6a?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const bloomsList = [
    { id: 'rose', name: 'English Garden Rose', price: 6, tag: 'Romantic' },
    { id: 'tulip', name: 'French Tulip', price: 5, tag: 'Graceful' },
    { id: 'ranunculus', name: 'Cloni Ranunculus', price: 6, tag: 'Artisanal' },
    { id: 'peony', name: 'Sarah Peony', price: 8, tag: 'Opulent' },
    { id: 'hydrangea', name: 'Cloud Hydrangea', price: 7, tag: 'Sculptural' },
    { id: 'eucalyptus', name: 'Silver Dollar Eucalyptus', price: 4, tag: 'Organic' },
  ];

  const wraps = [
    { id: 'paper', name: 'Raw Artisanal Craft Paper', price: 5, desc: 'Eco-conscious, textured paper tied with hemp twine' },
    { id: 'silk', name: 'Streaming Italian Silk Ribbon', price: 12, desc: 'Elegant, flowing silk ribbon in custom hand-dyed tints' },
    { id: 'glass', name: 'Minimalist Handblown Glass Vase', price: 28, desc: 'Sleek, transparent circular vessel, display-ready' },
  ];

  const toggleBloom = (bloom) => {
    if (selectedBlooms.find((b) => b.id === bloom.id)) {
      setSelectedBlooms(selectedBlooms.filter((b) => b.id !== bloom.id));
    } else {
      if (selectedBlooms.length >= 3) {
        // limit to max 3 focal blooms to maintain arrangement harmony
        return;
      }
      setSelectedBlooms([...selectedBlooms, bloom]);
    }
  };

  const selectMood = (mood) => {
    setSelectedMood(mood);
    setStep(2);
  };

  const selectWrap = (wrap) => {
    setSelectedWrap(wrap);
    setStep(4);
  };

  const calculateTotal = () => {
    if (!selectedMood) return 0;
    const base = selectedMood.basePrice;
    const bloomsCost = selectedBlooms.reduce((acc, b) => acc + b.price, 0);
    const wrapCost = selectedWrap ? selectedWrap.price : 0;
    return base + bloomsCost + wrapCost;
  };

  const resetBuilder = () => {
    setStep(1);
    setSelectedMood(null);
    setSelectedBlooms([]);
    setSelectedWrap(null);
    setIsOrdered(false);
  };

  const handleOrder = () => {
    setIsOrdered(true);
  };

  // Helper variables for rendering preview
  const currentTotal = calculateTotal();

  return (
    <section className="py-24 bg-brand-cream border-t border-brand-olive/5 relative overflow-hidden" id="builder">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-brand-rose/20 filter blur-3xl pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] rounded-full bg-brand-sage/10 filter blur-3xl pointer-events-none -ml-24 -mb-24" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-display uppercase tracking-widest text-brand-sage font-bold flex justify-center items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-gold" />
            L'Atelier Bespoke Experience
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-olive font-medium">
            Assemble Your Creation
          </h2>
          <p className="max-w-xl mx-auto text-brand-charcoal/70 text-sm md:text-base">
            Act as lead curator. Choose the narrative, the statement blooms, and the final vessel binding to craft a bouquet uniquely yours.
          </p>
        </div>

        {/* Builder Board Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Live Interactive Preview Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 md:p-8 rounded-2xl border border-brand-olive/10 bg-white/40 backdrop-blur-md shadow-sm relative min-h-[420px]">
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-display uppercase tracking-widest text-brand-sage font-bold">
                  Bespoke Recipe
                </span>
                <span className="text-xs font-serif text-brand-olive font-semibold bg-brand-rose/40 px-2.5 py-0.5 rounded-full">
                  Step {step} of 4
                </span>
              </div>

              {/* Dynamic Visualization based on steps */}
              <div className="aspect-4/3 w-full rounded-xl overflow-hidden relative shadow-sm border border-brand-olive/5 bg-brand-cream/60 flex items-center justify-center">
                <BouquetGraphic mood={selectedMood} blooms={selectedBlooms} wrap={selectedWrap} />
                {!selectedMood && (
                  <div className="absolute text-center p-6 space-y-2 pointer-events-none">
                    <div className="w-12 h-12 rounded-full border border-brand-olive/15 flex items-center justify-center mx-auto text-brand-sage animate-spin-slow">
                      ✦
                    </div>
                    <p className="text-xs font-display uppercase tracking-widest text-brand-sage font-bold">
                      Awaiting Mood Selection
                    </p>
                  </div>
                )}
              </div>

              {/* Selection Summary */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="flex justify-between items-center text-brand-charcoal/80">
                  <span className="text-brand-sage font-bold uppercase tracking-wider text-[10px]">Theme Base</span>
                  <span className="font-serif">
                    {selectedMood ? `${selectedMood.name} ($${selectedMood.basePrice})` : 'None Selected'}
                  </span>
                </div>
                
                <div className="flex justify-between items-start text-brand-charcoal/80">
                  <span className="text-brand-sage font-bold uppercase tracking-wider text-[10px]">Blooms (Max 3)</span>
                  <div className="text-right flex flex-col font-serif">
                    {selectedBlooms.length > 0 ? (
                      selectedBlooms.map((bloom) => (
                        <span key={bloom.id}>{bloom.name} (+${bloom.price})</span>
                      ))
                    ) : (
                      <span className="text-brand-sage italic text-[11px]">No stems selected</span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center text-brand-charcoal/80">
                  <span className="text-brand-sage font-bold uppercase tracking-wider text-[10px]">Wrap Binding</span>
                  <span className="font-serif">
                    {selectedWrap ? `${selectedWrap.name} (+${selectedWrap.price})` : 'None Selected'}
                  </span>
                </div>
              </div>
            </div>

            {/* Price & Summary */}
            <div className="border-t border-brand-olive/10 pt-6 mt-6 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-display uppercase tracking-widest text-brand-sage block font-bold">
                  Total Investment
                </span>
                <span className="text-2xl font-serif text-brand-olive font-medium">
                  ${currentTotal.toFixed(2)}
                </span>
              </div>

              {(selectedMood || selectedBlooms.length > 0 || selectedWrap) && (
                <button
                  onClick={resetBuilder}
                  
                  className="p-2.5 rounded-full border border-brand-olive/10 hover:bg-brand-rose/25 text-brand-olive hover:border-brand-olive transition-colors duration-300 cursor-pointer"
                  title="Reset Curation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* RIGHT: Step Interaction Board */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <AnimatePresence mode="wait">
              {/* STEP 1: Select Mood */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <span className="text-brand-gold font-display text-xs uppercase tracking-widest font-bold">
                      Step One
                    </span>
                    <h3 className="text-2xl font-serif text-brand-olive">Select the Mood & Concept</h3>
                    <p className="text-brand-charcoal/60 text-xs">
                      The foundation of the arrangement. Sets the dominant tone, packaging background, and aesthetic soul.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {moods.map((mood) => (
                      <button
                        key={mood.id}
                        onClick={() => selectMood(mood)}
                        
                        className={`p-5 rounded-xl border text-left flex flex-col justify-between aspect-square transition-all duration-500 cursor-pointer relative overflow-hidden group ${
                          selectedMood?.id === mood.id
                            ? 'border-brand-olive bg-brand-olive/5 shadow-md scale-[1.02]'
                            : 'border-brand-olive/15 hover:border-brand-olive/50 bg-white/30'
                        }`}
                      >
                        <div className="space-y-2 relative z-10">
                          <span className="text-[9px] font-display uppercase tracking-widest text-brand-sage font-bold block">
                            {mood.tag}
                          </span>
                          <h4 className="text-lg font-serif text-brand-olive leading-tight group-hover:text-brand-gold transition-colors duration-300">
                            {mood.name}
                          </h4>
                          <p className="text-[10px] text-brand-charcoal/60 leading-relaxed font-sans line-clamp-3">
                            {mood.description}
                          </p>
                        </div>
                        <div className="flex justify-between items-baseline mt-4 relative z-10">
                          <span className="text-xs text-brand-sage font-semibold">Base Price</span>
                          <span className="text-lg font-serif text-brand-olive font-medium">${mood.basePrice}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Choose Blooms */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <span className="text-brand-gold font-display text-xs uppercase tracking-widest font-bold">
                      Step Two
                    </span>
                    <h3 className="text-2xl font-serif text-brand-olive">Select Focal Blooms</h3>
                    <p className="text-brand-charcoal/60 text-xs">
                      Pick up to 3 statement stems to establish volume, structure, and artistic contrast.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {bloomsList.map((bloom) => {
                      const isSelected = selectedBlooms.some((b) => b.id === bloom.id);
                      return (
                        <button
                          key={bloom.id}
                          onClick={() => toggleBloom(bloom)}
                          
                          className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? 'border-brand-olive bg-brand-olive/5 shadow-md'
                              : 'border-brand-olive/15 hover:border-brand-olive/45 bg-white/20'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-[8px] font-display uppercase tracking-widest text-brand-sage font-bold">
                              {bloom.tag}
                            </span>
                            {isSelected && (
                              <span className="w-4 h-4 rounded-full bg-brand-olive text-brand-cream flex items-center justify-center text-[9px]">
                                <Check className="w-2.5 h-2.5" />
                              </span>
                            )}
                          </div>
                          <div className="mt-4">
                            <h4 className="text-sm font-display font-medium text-brand-olive leading-tight">
                              {bloom.name}
                            </h4>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-[10px] text-brand-sage">per stem</span>
                              <span className="text-sm font-serif text-brand-olive font-medium">+${bloom.price}</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-4 border-t border-brand-olive/10">
                    <button
                      onClick={() => {
                                            setStep(1);
                      }}
                      className="text-xs font-display uppercase tracking-wider text-brand-sage hover:text-brand-olive font-bold cursor-pointer"
                    >
                      ← Back to Theme
                    </button>
                    <button
                      disabled={selectedBlooms.length === 0}
                      onClick={() => {
                                            setStep(3);
                      }}
                      
                      className={`flex items-center gap-1.5 px-6 py-2.5 rounded-full font-display uppercase text-[10px] tracking-wider font-bold transition-all cursor-pointer shadow-sm ${
                        selectedBlooms.length === 0
                          ? 'bg-brand-olive/10 text-brand-olive/40 cursor-not-allowed'
                          : 'bg-brand-olive text-brand-cream hover:bg-brand-charcoal'
                      }`}
                    >
                      Choose Wrap
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Select Wrap */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <span className="text-brand-gold font-display text-xs uppercase tracking-widest font-bold">
                      Step Three
                    </span>
                    <h3 className="text-2xl font-serif text-brand-olive">Binding & Presentation</h3>
                    <p className="text-brand-charcoal/60 text-xs">
                      Decide how the arrangement is presented. A rustic paper finish, organic silk bows, or a timeless glass display vessel.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {wraps.map((wrap) => (
                      <button
                        key={wrap.id}
                        onClick={() => selectWrap(wrap)}
                        
                        className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-300 cursor-pointer ${
                          selectedWrap?.id === wrap.id
                            ? 'border-brand-olive bg-brand-olive/5 shadow-md'
                            : 'border-brand-olive/15 hover:border-brand-olive/40 bg-white/20'
                        }`}
                      >
                        <div className="space-y-1 max-w-[80%]">
                          <h4 className="text-sm font-display font-bold text-brand-olive uppercase tracking-wider">
                            {wrap.name}
                          </h4>
                          <p className="text-[11px] text-brand-charcoal/60 leading-relaxed font-sans">
                            {wrap.desc}
                          </p>
                        </div>
                        <span className="text-lg font-serif text-brand-olive font-medium whitespace-nowrap">
                          +${wrap.price}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-4 border-t border-brand-olive/10">
                    <button
                      onClick={() => {
                                            setStep(2);
                      }}
                      className="text-xs font-display uppercase tracking-wider text-brand-sage hover:text-brand-olive font-bold cursor-pointer"
                    >
                      ← Back to Blooms
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Summary & Add to Cart */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <span className="text-brand-gold font-display text-xs uppercase tracking-widest font-bold">
                      Design Complete
                    </span>
                    <h3 className="text-2xl font-serif text-brand-olive">Curation Summary</h3>
                    <p className="text-brand-charcoal/60 text-xs">
                      Verify your bespoke configuration. The floral artisans will begin sourcing and assembly immediately.
                    </p>
                  </div>

                  {/* Receipt Paper Card */}
                  <div className="p-6 bg-brand-rose/25 rounded-2xl border border-brand-olive/10 space-y-4">
                    <div className="border-b border-brand-olive/10 pb-3 flex justify-between items-center">
                      <span className="text-xs font-display font-bold uppercase tracking-wider text-brand-olive">
                        Bespoke Blueprint
                      </span>
                      <span className="text-[10px] text-brand-sage font-display">
                        ID: LA-{Math.floor(Math.random() * 90000) + 10000}
                      </span>
                    </div>

                    <ul className="space-y-2.5 text-xs text-brand-charcoal/90">
                      <li className="flex justify-between">
                        <span>Theme: {selectedMood?.name}</span>
                        <span className="font-serif">${selectedMood?.basePrice}</span>
                      </li>
                      {selectedBlooms.map((bloom) => (
                        <li key={bloom.id} className="flex justify-between text-brand-olive/80">
                          <span>• {bloom.name}</span>
                          <span className="font-serif">+${bloom.price}</span>
                        </li>
                      ))}
                      <li className="flex justify-between">
                        <span>Vessel Bind: {selectedWrap?.name}</span>
                        <span className="font-serif">+${selectedWrap?.price}</span>
                      </li>
                    </ul>

                    <div className="border-t border-brand-olive/10 pt-4 flex justify-between items-baseline">
                      <span className="text-xs font-display font-bold uppercase text-brand-olive">
                        Subtotal
                      </span>
                      <span className="text-xl font-serif text-brand-olive font-medium">
                        ${currentTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => {
                                            setStep(3);
                      }}
                      className="px-6 py-3 rounded-full border border-brand-olive/20 text-xs font-display font-bold uppercase tracking-wider text-brand-sage hover:text-brand-olive hover:border-brand-olive text-center cursor-pointer transition-colors duration-300"
                    >
                      Modify Binding
                    </button>
                    
                    <button
                      onClick={handleOrder}
                      
                      disabled={isOrdered}
                      className={`flex-1 flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-display uppercase text-xs tracking-widest font-bold shadow-md cursor-pointer transition-all duration-300 ${
                        isOrdered
                          ? 'bg-brand-sage text-brand-cream'
                          : 'bg-brand-olive text-brand-cream hover:bg-brand-charcoal'
                      }`}
                    >
                      {isOrdered ? (
                        <>
                          <Heart className="w-4 h-4 fill-brand-cream" />
                          Curator Blueprint Logged
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          Add Curation to Vessel Bag
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};

export default BouquetBuilder;
