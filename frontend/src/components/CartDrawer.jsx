import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, Heart, Sparkles } from 'lucide-react';
import Magnetic from './Magnetic';

export const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Cart Summary, 2: Form, 3: Success
  const [shippingInfo, setShippingInfo] = useState({ name: '', email: '', address: '' });

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setCheckoutStep(2); // Move to processing/success
    setTimeout(() => {
      setCheckoutStep(3); // Show success screen
    }, 1500);
  };

  const handleCloseSuccess = () => {
    onClearCart();
    setIsCheckingOut(false);
    setCheckoutStep(1);
    onClose();
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

          {/* Drawer Body */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 220 }}
            className="relative w-full max-w-md h-full bg-brand-cream border-l border-brand-olive/10 flex flex-col shadow-2xl z-10"
          >
            {/* Header */}
            <div className="sticky top-0 bg-brand-cream/80 backdrop-blur-md px-6 py-5 flex justify-between items-center border-b border-brand-olive/5 z-20">
              <span className="text-xs font-display uppercase tracking-widest text-brand-olive font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-gold" />
                Vessel Bag ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
              </span>
              <Magnetic strength={0.3}>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full border border-brand-olive/10 flex items-center justify-center hover:bg-brand-olive hover:text-brand-cream hover:border-brand-olive transition-colors duration-300 cursor-pointer"
                  title="Close Cart"
                >
                  <X className="w-4 h-4" />
                </button>
              </Magnetic>
            </div>

            {/* Main content body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {checkoutStep === 3 ? (
                /* Success Screen */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col justify-center items-center text-center space-y-6 px-4"
                >
                  <div className="w-20 h-20 rounded-full bg-brand-olive flex items-center justify-center text-brand-gold text-4xl animate-bounce">
                    🌸
                  </div>
                  <h3 className="text-2xl font-serif text-brand-olive">Blueprint Logged</h3>
                  <p className="text-sm text-brand-charcoal/70 leading-relaxed font-sans">
                    Gratitude, {shippingInfo.name}. Our floral artisans have logged your curation blueprint and will begin stem selection immediately.
                  </p>
                  <div className="p-4 bg-brand-rose/25 rounded-xl border border-brand-olive/10 w-full text-xs text-left font-sans space-y-2">
                    <p className="font-semibold text-brand-olive">Delivery Summary:</p>
                    <p>Recipient: {shippingInfo.name}</p>
                    <p>Notification: {shippingInfo.email}</p>
                    <p>Destination: {shippingInfo.address}</p>
                  </div>
                  <Magnetic strength={0.2} className="w-full">
                    <button
                      onClick={handleCloseSuccess}
                      className="w-full py-3.5 bg-brand-olive text-brand-cream hover:bg-brand-charcoal rounded-full font-display uppercase text-xs tracking-widest font-bold transition-all shadow-md cursor-pointer"
                    >
                      Return to Atelier
                    </button>
                  </Magnetic>
                </motion.div>
              ) : isCheckingOut ? (
                /* Checkout Form Screen */
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <h3 className="text-lg font-serif text-brand-olive">Delivery Coordinates</h3>
                    <p className="text-xs text-brand-charcoal/60">Provide coordinates where our local florist couriers will deliver the stems.</p>
                  </div>

                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-display uppercase tracking-widest text-brand-sage font-bold block">Full Name</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.name}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                        placeholder="Jean-Luc Picard"
                        className="w-full p-3 bg-white border border-brand-olive/15 rounded-lg focus:outline-none focus:border-brand-olive text-sm font-sans"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-display uppercase tracking-widest text-brand-sage font-bold block">Email Address</label>
                      <input
                        type="email"
                        required
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                        placeholder="jeanluc@atelier.com"
                        className="w-full p-3 bg-white border border-brand-olive/15 rounded-lg focus:outline-none focus:border-brand-olive text-sm font-sans"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-display uppercase tracking-widest text-brand-sage font-bold block">Delivery Address</label>
                      <textarea
                        required
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                        placeholder="17 Park Street, Kolkata, West Bengal 700016"
                        className="w-full p-3 bg-white border border-brand-olive/15 rounded-lg focus:outline-none focus:border-brand-olive text-sm font-sans min-h-[80px] resize-none"
                      />
                    </div>

                    <div className="pt-4 flex gap-3">
                      <button
                        type="button"
                        onClick={() => setIsCheckingOut(false)}
                        className="flex-1 py-3 rounded-full border border-brand-olive/20 text-xs font-display font-bold uppercase tracking-wider text-brand-sage hover:text-brand-olive text-center cursor-pointer transition-colors duration-300"
                      >
                        Back to Bag
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-brand-olive text-brand-cream hover:bg-brand-charcoal rounded-full font-display uppercase text-xs tracking-widest font-bold transition-all shadow-md cursor-pointer text-center"
                      >
                        Confirm Order
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : cartItems.length === 0 ? (
                /* Empty Cart Screen */
                <div className="h-full flex flex-col justify-center items-center text-center space-y-4 py-20">
                  <div className="w-16 h-16 rounded-full border border-brand-olive/15 flex items-center justify-center text-brand-sage text-xl animate-pulse">
                    🍃
                  </div>
                  <p className="font-serif text-lg text-brand-olive">Your Vessel Bag is Empty</p>
                  <p className="text-xs text-brand-charcoal/60 max-w-[200px] leading-relaxed">
                    Select a seasonal curation or design a bespoke bouquet to add stems.
                  </p>
                  <Magnetic strength={0.2}>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 bg-brand-olive text-brand-cream hover:bg-brand-charcoal rounded-full font-display uppercase text-[10px] tracking-wider font-bold transition-all cursor-pointer"
                    >
                      Browse Atelier
                    </button>
                  </Magnetic>
                </div>
              ) : (
                /* Cart Items List Screen */
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="p-4 bg-white/60 rounded-xl border border-brand-olive/5 shadow-sm flex gap-4 items-center group relative overflow-hidden"
                    >
                      {/* Thumbnail Image */}
                      <div className="w-16 h-20 rounded-lg overflow-hidden shrink-0 border border-brand-olive/5 bg-brand-cream">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="font-serif text-brand-olive text-base font-semibold leading-tight truncate">
                          {item.title}
                        </h4>
                        <p className="text-[10px] text-brand-sage font-sans truncate leading-none">
                          {item.details}
                        </p>
                        <div className="flex justify-between items-center pt-1.5">
                          <span className="font-serif text-brand-olive font-medium text-sm">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          
                          {/* Quantity Selector controls */}
                          <div className="flex items-center border border-brand-olive/10 rounded-full bg-brand-cream/40">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-brand-olive hover:bg-brand-olive/10 rounded-full transition-colors cursor-pointer text-xs"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="w-6 text-center text-xs font-display font-bold text-brand-olive">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-brand-olive hover:bg-brand-olive/10 rounded-full transition-colors cursor-pointer text-xs"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full text-brand-sage hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="Remove Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Footer Actions */}
            {cartItems.length > 0 && checkoutStep !== 3 && !isCheckingOut && (
              <div className="sticky bottom-0 bg-brand-cream border-t border-brand-olive/10 px-6 py-5 space-y-4 z-20">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-display uppercase tracking-widest text-brand-sage font-bold">
                    Subtotal Estimate
                  </span>
                  <span className="text-2xl font-serif text-brand-olive font-medium">
                    ${calculateSubtotal()}
                  </span>
                </div>
                
                <Magnetic strength={0.15} className="w-full" style={{ display: 'block' }}>
                  <button
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full py-4 bg-brand-olive text-brand-cream hover:bg-brand-charcoal rounded-full font-display uppercase text-xs tracking-widest font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    Proceed to Delivery Coordinates
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Magnetic>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
