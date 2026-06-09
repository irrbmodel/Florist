import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from '../hooks/useSound';

const SoundController = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const { resumeContext, playClick } = useSound();

  useEffect(() => {
    // Set up audio source
    const audio = new Audio('https://assets.mixkit.co/music/preview/mixkit-peaceful-piano-502.mp3');
    audio.loop = true;
    audio.volume = 0; // Start at 0 volume for fade in
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = async () => {
    if (!audioRef.current) return;

    // Play click sound effect
    playClick();

    // Resume browser AudioContext
    await resumeContext();

    if (isPlaying) {
      // Fade out
      let vol = audioRef.current.volume;
      const fadeOut = setInterval(() => {
        if (audioRef.current && vol > 0.05) {
          vol -= 0.05;
          audioRef.current.volume = Math.max(0, vol);
        } else {
          clearInterval(fadeOut);
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.volume = 0;
          }
          setIsPlaying(false);
        }
      }, 50);
    } else {
      // Start and fade in
      audioRef.current.play().catch((err) => {
        console.warn('Audio play was prevented by browser security policy:', err);
      });
      setIsPlaying(true);
      
      let vol = 0;
      const fadeIn = setInterval(() => {
        if (audioRef.current && vol < 0.25) { // Cap ambient volume at 25%
          vol += 0.02;
          audioRef.current.volume = Math.min(0.25, vol);
        } else {
          clearInterval(fadeIn);
        }
      }, 50);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Visual Audio Wave */}
      {isPlaying && (
        <div className="flex gap-[3px] items-center bg-brand-cream/80 backdrop-blur-md px-3 py-2 rounded-full border border-brand-olive/10 h-8">
          {[1, 2, 3, 4, 5].map((bar) => (
            <motion.div
              key={bar}
              className="w-[2px] bg-brand-sage rounded-full"
              animate={{
                height: [6, 16, 8, 20, 6][bar % 5],
              }}
              transition={{
                duration: [0.6, 0.9, 0.7, 0.8, 0.5][bar % 5],
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay: bar * 0.1,
              }}
              style={{ minHeight: '4px' }}
            />
          ))}
        </div>
      )}

      {/* Button */}
      <button
        onClick={toggleSound}
        className="w-12 h-12 rounded-full border border-brand-olive/20 flex items-center justify-center bg-brand-cream hover:bg-brand-olive hover:text-brand-cream transition-colors duration-500 cursor-pointer shadow-sm relative group"
        data-cursor-text={isPlaying ? 'MUTE' : 'PLAY'}
        title={isPlaying ? 'Mute Atmosphere' : 'Play Atmosphere'}
      >
        <span className="absolute inset-0 rounded-full border border-brand-olive/10 scale-100 group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
        {isPlaying ? (
          <Volume2 className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
        ) : (
          <VolumeX className="w-5 h-5 text-brand-olive/60 transition-transform duration-300 group-hover:scale-110 group-hover:text-brand-cream" />
        )}
      </button>
    </div>
  );
};

export default SoundController;
