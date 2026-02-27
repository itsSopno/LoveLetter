import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LoadingScreen = ({ onComplete }) => {
  const containerRef = useRef();
  const starRef = useRef();
  const heartRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline();

    // Star Genesis Animation
    tl.set(starRef.current, { scale: 0, opacity: 0 })
      .to(starRef.current, {
        scale: 1.5,
        opacity: 1,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
          // Twinkle the genesis star
          gsap.to(starRef.current, {
            opacity: 0.5,
            scale: 1.2,
            duration: 0.5,
            repeat: -1,
            yoyo: true
          });
        }
      })
      .to(starRef.current, {
        scale: 40,
        opacity: 0,
        duration: 2,
        ease: "expo.in",
        delay: 0.5
      });

    // Constellation Heart Reveal
    tl.fromTo(heartRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2, ease: "power4.out" },
      "-=1"
    );

    // Text reveal
    tl.fromTo(textRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "expo.out" },
      "-=1.5"
    );

    // Final fade out
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 2,
      delay: 2.5,
      onComplete: () => onComplete()
    });

    // Create background stars
    const starsCount = 100;
    for (let i = 0; i < starsCount; i++) {
      const s = document.createElement('div');
      s.style.position = 'absolute';
      s.style.width = Math.random() * 2 + 'px';
      s.style.height = s.style.width;
      s.style.background = 'white';
      s.style.borderRadius = '50%';
      s.style.top = Math.random() * 100 + 'vh';
      s.style.left = Math.random() * 100 + 'vw';
      s.style.opacity = Math.random();
      s.style.animation = `star-twinkle ${Math.random() * 3 + 2}s infinite ease-in-out`;
      containerRef.current.appendChild(s);
    }

    return () => { };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="celestial-bg"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Genesis Star */}
      <div
        ref={starRef}
        style={{
          position: 'absolute',
          width: '4px',
          height: '4px',
          background: 'var(--color-celestial-gold)',
          borderRadius: '50%',
          boxShadow: '0 0 20px 5px var(--color-celestial-gold)'
        }}
      />

      <div
        className="glass-celestial"
        style={{
          padding: '4rem',
          borderRadius: '2rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          zIndex: 10
        }}
      >
        <div ref={heartRef} style={{ fontSize: '6rem', position: 'relative' }}>
          <span className="star-glow">❤️</span>
          {/* Animated SVG Constellation could go here */}
        </div>
        <div ref={textRef}>
          <h2 className="milky-font star-glow" style={{ fontSize: '3rem', color: 'var(--color-celestial-gold)', marginBottom: '0.5rem' }}>
            A Galaxy of Love...
          </h2>
          <p className="biglla-font" style={{ fontSize: '1.2rem', color: 'var(--color-starlight)', opacity: 0.8, letterSpacing: '2px' }}>
            BECOMING PART OF YOUR UNIVERSE
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
