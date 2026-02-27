import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LoadingScreen = ({ onComplete }) => {
  const containerRef = useRef();
  const heartRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline();

    // Heart beat animation
    gsap.to(heartRef.current, {
      scale: 1.25,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Fade in text
    tl.fromTo(textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.8, ease: "expo.out", delay: 0.5 }
    );

    // Initial heart scale reveal
    tl.fromTo(heartRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "back.out(1.7)" },
      "<"
    );

    // Fade out everything after a delay
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 2,
      delay: 3.5,
      onComplete: () => onComplete()
    });

    // Floating particles and Bokeh
    const createParticle = () => {
      if (!containerRef.current) return;
      const p = document.createElement('div');
      const isBokeh = Math.random() > 0.7;

      if (isBokeh) {
        p.style.width = Math.random() * 50 + 20 + 'px';
        p.style.height = p.style.width;
        p.style.background = 'white';
        p.style.borderRadius = '50%';
        p.style.filter = 'blur(15px)';
        p.style.opacity = Math.random() * 0.2;
      } else {
        p.innerHTML = '❤️';
        p.style.fontSize = (Math.random() * 15 + 10) + 'px';
        p.style.opacity = Math.random() * 0.5 + 0.2;
      }

      p.style.position = 'absolute';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.top = '110vh';
      containerRef.current.appendChild(p);

      gsap.to(p, {
        y: '-120vh',
        x: (Math.random() - 0.5) * 300,
        rotation: isBokeh ? 0 : Math.random() * 720,
        duration: Math.random() * 6 + 6,
        ease: "none",
        onComplete: () => p.remove()
      });
    };

    const particleInterval = setInterval(createParticle, 300);

    return () => clearInterval(particleInterval);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'linear-gradient(135deg, #FFC0CB 0%, #E6E6FA 100%)',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Background Bokeh Image Layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'url(/src/assets/bokeh_background.png)',
          backgroundSize: 'cover',
          opacity: 0.4,
          filter: 'blur(5px)'
        }}
      />

      <div
        className="glass-effect"
        style={{
          padding: '4rem',
          borderRadius: '3rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          position: 'relative',
          zIndex: 1,
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}
      >
        <div ref={heartRef} style={{ fontSize: '6rem', filter: 'drop-shadow(0 0 25px rgba(255, 255, 255, 0.8))' }}>
          ❤️
        </div>
        <div ref={textRef} style={{ color: 'white' }}>
          <h2 className="milky-font" style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 400, transform: 'rotate(-2deg)' }}>
            Something special is coming...
          </h2>
          <p className="biglla-font" style={{ fontSize: '1.4rem', opacity: 0.9, letterSpacing: '1px' }}>
            Every heartbeat carries my love
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
