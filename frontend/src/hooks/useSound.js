import { useEffect, useRef } from 'react';

// Create a single shared AudioContext to prevent overloading browser audio nodes
let sharedAudioCtx = null;

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!sharedAudioCtx) {
    sharedAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return sharedAudioCtx;
};

export const useSound = () => {
  const audioCtxRef = useRef(null);

  useEffect(() => {
    // We defer actual creation of AudioContext until the hook runs on the client
    audioCtxRef.current = getAudioContext();
  }, []);

  const playHover = () => {
    try {
      const ctx = audioCtxRef.current || getAudioContext();
      if (!ctx || ctx.state === 'suspended') return;

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Soft mechanical woodblock tone: triangle wave
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.08);

      // Envelope
      gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.09);
    } catch (e) {
      console.warn('Audio Synthesis Error:', e);
    }
  };

  const playClick = () => {
    try {
      const ctx = audioCtxRef.current || getAudioContext();
      if (!ctx || ctx.state === 'suspended') return;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Delicate high chime: sine + triangle waves combined
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, ctx.currentTime); // A5

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1320, ctx.currentTime); // E6 (fifth above)

      gainNode.gain.setValueAtTime(0.06, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.16);
      osc2.stop(ctx.currentTime + 0.16);
    } catch (e) {
      console.warn('Audio Synthesis Error:', e);
    }
  };

  const playSuccess = () => {
    try {
      const ctx = audioCtxRef.current || getAudioContext();
      if (!ctx || ctx.state === 'suspended') return;

      const playNote = (freq, time, duration, volume = 0.04) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        gainNode.gain.setValueAtTime(volume, time);
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + duration);

        osc.start(time);
        osc.stop(time + duration + 0.05);
      };

      const now = ctx.currentTime;
      // Arpeggio: C5 -> E5 -> G5 -> C6
      playNote(523.25, now, 0.12, 0.04);
      playNote(659.25, now + 0.08, 0.12, 0.04);
      playNote(783.99, now + 0.16, 0.12, 0.04);
      playNote(1046.50, now + 0.24, 0.25, 0.05);
    } catch (e) {
      console.warn('Audio Synthesis Error:', e);
    }
  };

  // Helper to resume context on user action
  const resumeContext = async () => {
    const ctx = audioCtxRef.current || getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      await ctx.resume();
    }
  };

  return { playHover, playClick, playSuccess, resumeContext };
};
