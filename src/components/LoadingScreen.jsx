import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LoadingScreen = ({ onComplete }) => {
  const containerRef = useRef();
  const heartRef = useRef();
  const textRef = useRef();
  const particlesRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline();

    // Heart beat animation
    gsap.to(heartRef.current, {
      scale: 1.2,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Fade in text
    tl.fromTo(textRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out", delay: 0.5 }
    );

    // Initial heart scale reveal
    tl.fromTo(heartRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "back.out(1.7)" },
      "<"
    );

    // Fade out everything after a delay
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 1.5,
      delay: 3,
      onComplete: () => onComplete()
    });

    // Simple floating hearts/particles
    const createParticle = () => {
      const p = document.createElement('div');
      p.innerHTML = '❤️';
      p.style.position = 'absolute';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.top = '110vh';
      p.style.fontSize = (Math.random() * 15 + 10) + 'px';
      p.style.opacity = Math.random() * 0.5 + 0.2;
      containerRef.current.appendChild(p);

      gsap.to(p, {
        y: '-120vh',
        x: (Math.random() - 0.5) * 200,
        rotation: Math.random() * 360,
        duration: Math.random() * 5 + 5,
        ease: "none",
        onComplete: () => p.remove()
      });
    };

    const particleInterval = setInterval(createParticle, 400);

    return () => clearInterval(particleInterval);
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'url(/src/assets/bokeh_background.png)',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      <div 
        className="glass-effect"
        style={{
          padding: '3rem',
          borderRadius: '2rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem'
        }}
      >
        <div ref={heartRef} style={{ fontSize: '5rem', filter: 'drop-shadow(0 0 15px rgba(255, 192, 203, 0.8))' }}>
          ❤️
        </div>
        <div ref={textRef} style={{ color: 'white' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', fontWeight: 300 }}>
            Loading something special for you...
          </h2>
          <p className="romantic-font" style={{ fontSize: '1.5rem', opacity: 0.9 }}>
            Every heartbeat carries my love
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
