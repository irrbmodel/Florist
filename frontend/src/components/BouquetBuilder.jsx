import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, ArrowRight, RotateCcw, ShoppingBag, Heart } from 'lucide-react';
import { useSound } from '../hooks/useSound';

const BouquetBuilder = () => {
  const { playClick, playHover, playSuccess } = useSound();
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
    playClick();
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
    playClick();
    setSelectedMood(mood);
    setStep(2);
  };

  const selectWrap = (wrap) => {
    playClick();
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
    playClick();
    setStep(1);
    setSelectedMood(null);
    setSelectedBlooms([]);
    setSelectedWrap(null);
    setIsOrdered(false);
  };

  const handleOrder = () => {
    playSuccess();
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
              <div className="aspect-4/3 w-full rounded-xl overflow-hidden relative shadow-sm border border-brand-olive/5 bg-brand-rose/20 flex items-center justify-center">
                {selectedMood ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={selectedMood.imageUrl}
                      alt={selectedMood.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                      <span className="text-[10px] uppercase font-display tracking-widest text-brand-gold font-bold">
                        Selected Theme
                      </span>
                      <h3 className="text-xl font-serif">{selectedMood.name}</h3>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center p-6 space-y-2">
                    <div className="w-12 h-12 rounded-full border border-brand-olive/15 flex items-center justify-center mx-auto text-brand-sage">
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
                  onMouseEnter={playHover}
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
                        onMouseEnter={playHover}
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
                          onMouseEnter={playHover}
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
                        playClick();
                        setStep(1);
                      }}
                      className="text-xs font-display uppercase tracking-wider text-brand-sage hover:text-brand-olive font-bold cursor-pointer"
                    >
                      ← Back to Theme
                    </button>
                    <button
                      disabled={selectedBlooms.length === 0}
                      onClick={() => {
                        playClick();
                        setStep(3);
                      }}
                      onMouseEnter={playHover}
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
                        onMouseEnter={playHover}
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
                        playClick();
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
                        playClick();
                        setStep(3);
                      }}
                      className="px-6 py-3 rounded-full border border-brand-olive/20 text-xs font-display font-bold uppercase tracking-wider text-brand-sage hover:text-brand-olive hover:border-brand-olive text-center cursor-pointer transition-colors duration-300"
                    >
                      Modify Binding
                    </button>
                    
                    <button
                      onClick={handleOrder}
                      onMouseEnter={playHover}
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
