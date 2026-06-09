import React, { useEffect, useRef } from 'react';

export const PetalParticles = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // curating soft colors matching our palette
    const colors = [
      'rgba(234, 223, 217, 0.55)', // soft rose/bronze cream
      'rgba(197, 168, 128, 0.45)', // soft gold
      'rgba(124, 141, 120, 0.35)', // soft sage
      'rgba(253, 251, 247, 0.60)', // brand cream
    ];

    class Petal {
      constructor() {
        this.reset();
        // stagger spawn y initial values across height
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = -20 - Math.random() * 50;
        this.size = Math.random() * 11 + 6;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedY = Math.random() * 0.8 + 0.35; // Gentle downward speed
        this.speedX = Math.random() * 0.4 - 0.2; // Sideways bias
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = (Math.random() * 0.008 - 0.004) * 2;
        this.swayAmplitude = Math.random() * 1.6 + 0.4;
        this.swaySpeed = Math.random() * 0.012 + 0.004;
        this.swayTime = Math.random() * 100;
        this.type = Math.random() > 0.35 ? 'petal' : 'pollen'; // 65% petals, 35% pollen

        if (this.type === 'pollen') {
          this.size = Math.random() * 2 + 1;
          this.speedY = Math.random() * 0.6 + 0.2;
        }
      }

      update() {
        this.y += this.speedY;
        this.swayTime += this.swaySpeed;
        
        // Sway math
        const sway = Math.sin(this.swayTime) * this.swayAmplitude;
        this.x += this.speedX + sway;
        this.angle += this.angleSpeed;

        // Proximity calculation for cursor repulsion
        const dx = this.x - mouseRef.current.x;
        const dy = this.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 130) {
          const repelPower = (130 - dist) / 130; // 0 to 1
          const forceAngle = Math.atan2(dy, dx);
          this.x += Math.cos(forceAngle) * repelPower * 3.5;
          this.y += Math.sin(forceAngle) * repelPower * 2.5;
        }

        // Wrap or reset boundaries
        if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);

        if (this.type === 'petal') {
          ctx.rotate(this.angle);
          ctx.fillStyle = this.color;
          ctx.beginPath();
          // Drawing an organic organic petal curve shape
          ctx.moveTo(0, -this.size / 2);
          ctx.quadraticCurveTo(this.size / 1.8, -this.size / 1.8, this.size / 1.8, 0);
          ctx.quadraticCurveTo(this.size / 3.6, this.size / 1.8, 0, this.size / 1.8);
          ctx.quadraticCurveTo(-this.size / 1.8, this.size / 1.8, -this.size / 1.8, 0);
          ctx.quadraticCurveTo(-this.size / 1.8, -this.size / 1.8, 0, -this.size / 2);
          ctx.fill();
        } else {
          // Pollen particle
          ctx.fillStyle = 'rgba(197, 168, 128, 0.4)'; // soft gold glow
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    // Cap at 45 particles to maintain 120fps on normal screens
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => new Petal());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10 opacity-70"
    />
  );
};

export default PetalParticles;
