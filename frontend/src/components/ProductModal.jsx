import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Heart, Info, ArrowRight } from 'lucide-react';
import { useSound } from '../hooks/useSound';

const ProductModal = ({ isOpen, onClose, product }) => {
  const { playClick, playHover, playSuccess } = useSound();
  const [selectedSize, setSelectedSize] = useState('signature'); // signature, deluxe, grandeur
  const [giftNote, setGiftNote] = useState('');
  const [careOpen, setCareOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset state
      setSelectedSize('signature');
      setGiftNote('');
      setCareOpen(false);
      setIsAdded(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!product) return null;

  const sizeMultipliers = {
    signature: 1,
    deluxe: 1.4,
    grandeur: 1.8,
  };

  const finalPrice = (product.price * sizeMultipliers[selectedSize]).toFixed(2);

  const handleAddToBag = () => {
    playSuccess();
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-charcoal/40 backdrop-blur-sm"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 220 }}
            className="relative w-full max-w-2xl h-full bg-brand-cream border-l border-brand-olive/10 flex flex-col shadow-2xl z-10 overflow-y-auto"
          >
            {/* Header / Actions */}
            <div className="sticky top-0 bg-brand-cream/80 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-brand-olive/5 z-20">
              <span className="text-xs font-display uppercase tracking-widest text-brand-sage">
                {product.category}
              </span>
              <button
                onClick={() => {
                  playClick();
                  onClose();
                }}
                onMouseEnter={playHover}
                className="w-10 h-10 rounded-full border border-brand-olive/10 flex items-center justify-center hover:bg-brand-olive hover:text-brand-cream hover:border-brand-olive transition-colors duration-300 cursor-pointer"
                title="Close Drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 p-6 md:p-8 space-y-8">
              {/* Product Hero Image */}
              <div className="relative aspect-4/3 rounded-lg overflow-hidden border border-brand-olive/5 shadow-md animate-reveal">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-4 right-4 bg-brand-cream/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-display uppercase tracking-widest text-brand-olive border border-brand-olive/10 flex items-center gap-1.5 font-semibold">
                  <Sparkles className="w-3 h-3 text-brand-gold animate-pulse" />
                  Premium Curation
                </div>
              </div>

              {/* Title & Genus */}
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-serif text-brand-olive font-medium leading-none">
                  {product.title}
                </h2>
                {product.botanical && (
                  <p className="text-sm font-serif italic text-brand-sage">
                    Genus: {product.botanical}
                  </p>
                )}
                <div className="flex items-baseline gap-4 pt-2">
                  <span className="text-2xl font-serif text-brand-olive">${finalPrice}</span>
                  <span className="text-xs text-brand-sage">Tax included</span>
                </div>
              </div>

              <hr className="border-brand-olive/10" />

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-display uppercase tracking-widest text-brand-sage font-bold">
                  About this curation
                </h4>
                <p className="text-brand-charcoal/80 text-sm leading-relaxed font-sans">
                  {product.description}
                </p>
              </div>

              {/* Bouquet Sizing Selector */}
              <div className="space-y-3">
                <h4 className="text-xs font-display uppercase tracking-widest text-brand-sage font-bold">
                  Choose Arrangement Size
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'signature', label: 'Signature', desc: 'Standard size' },
                    { id: 'deluxe', label: 'Deluxe', desc: '+40% Blooms' },
                    { id: 'grandeur', label: 'Grandeur', desc: 'Double Size' },
                  ].map((size) => (
                    <button
                      key={size.id}
                      onClick={() => {
                        playClick();
                        setSelectedSize(size.id);
                      }}
                      onMouseEnter={playHover}
                      className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                        selectedSize === size.id
                          ? 'border-brand-olive bg-brand-olive/5 shadow-sm'
                          : 'border-brand-olive/15 hover:border-brand-olive/40 bg-transparent'
                      }`}
                    >
                      <span className="text-xs font-display font-bold uppercase tracking-wider block text-brand-olive">
                        {size.label}
                      </span>
                      <span className="text-[10px] text-brand-sage mt-1 leading-none">
                        {size.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Gift Note */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-display uppercase tracking-widest text-brand-sage font-bold">
                    Add Complimentary Note
                  </h4>
                  <span className="text-[10px] text-brand-sage">Optional</span>
                </div>
                <textarea
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="Type a thoughtful handwritten card message..."
                  className="w-full p-3 bg-brand-cream border border-brand-olive/15 rounded-lg focus:outline-none focus:border-brand-olive text-sm font-sans text-brand-charcoal/90 placeholder:text-brand-sage/60 min-h-[80px] resize-y"
                />
              </div>

              {/* Expandable Botanical Guide */}
              <div className="border border-brand-olive/10 rounded-lg overflow-hidden">
                <button
                  onClick={() => {
                    playClick();
                    setCareOpen(!careOpen);
                  }}
                  onMouseEnter={playHover}
                  className="w-full p-4 flex justify-between items-center bg-brand-olive/5 hover:bg-brand-olive/10 transition-colors duration-300 text-left cursor-pointer"
                >
                  <span className="text-xs font-display font-bold uppercase tracking-wider text-brand-olive flex items-center gap-2">
                    <Info className="w-4 h-4 text-brand-sage" />
                    Care & Conditioning Guidelines
                  </span>
                  <motion.span
                    animate={{ rotate: careOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-brand-olive text-sm font-semibold"
                  >
                    ▼
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {careOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-brand-cream border-t border-brand-olive/5 space-y-3 text-xs text-brand-charcoal/80 leading-relaxed font-sans">
                        <p>
                          <strong>Fresh Hydration:</strong> Upon arrival, trim stems at a 45-degree angle under water and place in clean, lukewarm water with floral nutrient.
                        </p>
                        <p>
                          <strong>Placement:</strong> Keep out of direct strong sunlight, cold drafts, and near fresh ripening fruit (which releases ethylene gas that ages flowers).
                        </p>
                        <p>
                          <strong>Water Changes:</strong> Change vase water completely every 48 hours to prevent bacterial bloom and keep stems drawing water cleanly.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Sticky Action Footer */}
            <div className="sticky bottom-0 bg-brand-cream border-t border-brand-olive/10 px-6 py-4 flex items-center justify-between z-20">
              <div className="hidden sm:block">
                <span className="text-[10px] font-display uppercase tracking-widest text-brand-sage block font-bold">
                  Total Estimate
                </span>
                <span className="text-xl font-serif text-brand-olive font-medium">
                  ${finalPrice}
                </span>
              </div>

              <motion.button
                onClick={handleAddToBag}
                onMouseEnter={playHover}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-display uppercase text-xs tracking-widest font-bold shadow-md cursor-pointer transition-all duration-300 ${
                  isAdded
                    ? 'bg-brand-sage text-brand-cream'
                    : 'bg-brand-olive text-brand-cream hover:bg-brand-charcoal'
                }`}
                whileTap={{ scale: 0.96 }}
              >
                {isAdded ? (
                  <>
                    <Heart className="w-4 h-4 fill-brand-cream" />
                    Added to Vessel
                  </>
                ) : (
                  <>
                    Add to Vessel Bag
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
