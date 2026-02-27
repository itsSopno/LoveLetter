import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LoveLetter = () => {
    const containerRef = useRef();
    const letterRef = useRef();
    const titleRef = useRef();
    const paragraphsRef = useRef([]);
    const signatureRef = useRef();
    const waxSealRef = useRef();

    useEffect(() => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

        // 3D Tilt Effect - Disabled on touch devices
        const handleMouseMove = (e) => {
            if (!letterRef.current || isTouchDevice) return;
            const { clientX, clientY } = e;
            const { left, top, width, height } = letterRef.current.getBoundingClientRect();

            const x = (clientX - left) / width - 0.5;
            const y = (clientY - top) / height - 0.5;

            gsap.to(letterRef.current, {
                rotationY: x * 8,
                rotationX: -y * 8,
                transformPerspective: 1000,
                duration: 0.5,
                ease: "power2.out"
            });
        };

        if (!isTouchDevice) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        // New "Sweet Unfolding" Reveal Animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: letterRef.current,
                start: "top 95%",
            }
        });

        tl.fromTo(letterRef.current,
            {
                rotateX: -90,
                opacity: 0,
                scale: 0.5,
            },
            {
                rotateX: 0,
                opacity: 1,
                scale: 1,
                duration: 2.5,
                ease: "elastic.out(1, 0.75)",
            }
        );

        // Staggered word reveal for paragraphs
        paragraphsRef.current.forEach((para) => {
            if (!para) return;

            const words = para.querySelectorAll('.word');

            gsap.to(words, {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.04,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: para,
                    start: "top 85%",
                }
            });
        });

        // Signature Reveal with rotation
        gsap.fromTo(signatureRef.current,
            { x: 30, opacity: 0, rotate: 10 },
            {
                x: 0,
                opacity: 1,
                rotate: -3,
                duration: 2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: signatureRef.current,
                    start: "top 90%",
                }
            }
        );

        // Floating particles with shadows
        const petals = ['🌸', '🌹', '✨', '🤍'];
        const createPetal = () => {
            if (!containerRef.current) return;
            const p = document.createElement('div');
            p.innerHTML = petals[Math.floor(Math.random() * petals.length)];
            p.style.position = 'absolute';
            p.style.left = Math.random() * 100 + 'vw';
            p.style.top = '-50px';
            p.style.fontSize = (Math.random() * (isMobile ? 15 : 30) + 10) + 'px';
            p.style.opacity = Math.random() * 0.4 + 0.3;
            p.style.pointerEvents = 'none';
            p.style.filter = `blur(${Math.random() * 2}px) drop-shadow(0 5px 5px rgba(0,0,0,0.1))`;
            containerRef.current.appendChild(p);

            gsap.to(p, {
                y: '220vh',
                x: (Math.random() - 0.5) * 500,
                rotation: Math.random() * 2000,
                duration: Math.random() * 15 + 10,
                ease: "none",
                onComplete: () => p.remove()
            });
        };

        const petalInterval = setInterval(createPetal, isMobile ? 1500 : 1000);

        return () => {
            clearInterval(petalInterval);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const prepareText = (text) => {
        return text.split(' ').map((word, i) => (
            <span key={i} className="word" style={{ display: 'inline-block', opacity: 0, transform: 'translateY(15px)', marginRight: '0.25em' }}>
                {word}
            </span>
        ));
    };

    return (
        <section
            ref={containerRef}
            className="letter-section unfolding-container"
            style={{
                minHeight: '200vh',
                padding: '20vh 5vw',
                background: 'linear-gradient(to bottom, #FAF9F6 0%, #FDFBFB 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div className="vignette-overlay" style={{ background: 'radial-gradient(circle, transparent 30%, rgba(183, 110, 121, 0.05) 100%)' }} />

            <div
                ref={letterRef}
                className="letter-card paper-texture shimmer-bg"
                style={{
                    width: '100%',
                    maxWidth: '850px',
                    margin: '0 auto',
                    padding: 'clamp(4rem, 12vw, 8rem) clamp(2rem, 10vw, 5rem)',
                    borderRadius: '4px',
                    boxShadow: '0 40px 80px rgba(183, 110, 121, 0.15), 0 10px 30px rgba(0,0,0,0.05)',
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transformStyle: 'preserve-3d'
                }}
            >
                {/* Ornate Inner Border */}
                <div style={{
                    position: 'absolute',
                    inset: '20px',
                    border: '1px solid rgba(183, 110, 121, 0.15)',
                    pointerEvents: 'none',
                    borderRadius: '4px'
                }} />

                {/* Detailed Wax Seal */}
                <div
                    ref={waxSealRef}
                    className="wax-seal"
                    style={{
                        position: 'absolute',
                        top: '-50px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 'clamp(80px, 20vw, 100px)',
                        height: 'clamp(80px, 20vw, 100px)',
                        background: 'radial-gradient(circle, #8B0000 0%, #D40000 100%)',
                        borderRadius: '50%',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.4), inset 0 0 15px rgba(0,0,0,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                        border: '2px solid #5A0000',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.1, duration: 0.3, ease: "back.out(2)" })}
                    onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3 })}
                >
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="rgba(255,215,0,0.6)" style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.5))' }}>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <div style={{ position: 'absolute', inset: '-8px', border: '5px solid rgba(139,0,0,0.4)', borderRadius: '50%' }} />
                    <div style={{ position: 'absolute', inset: '-15px', border: '2px solid rgba(139,0,0,0.2)', borderRadius: '50%' }} />
                </div>

                <div
                    ref={titleRef}
                    className="milky-font letter-title"
                    style={{
                        fontSize: 'clamp(3rem, 10vw, 4.5rem)',
                        color: '#B76E79',
                        marginBottom: '4rem',
                        textAlign: 'center',
                        transform: 'rotate(-2deg)',
                        textShadow: '2px 2px 0 rgba(255,255,255,0.8)'
                    }}
                >
                    My Dearest,
                </div>

                <div className="letter-body biglla-font" style={{ width: '100%', fontSize: 'clamp(1.2rem, 4.5vw, 1.5rem)', lineHeight: 1.9, color: '#2D2424', letterSpacing: '0.5px' }}>
                    <p ref={el => paragraphsRef.current[0] = el} style={{ marginBottom: '2.5rem' }}>
                        {prepareText("I wrote this letter today because I wanted you to know how much you truly mean to me. There are moments in life that change everything, and meeting you was the most")}
                        <span className="rose-gold-glow" style={{ fontWeight: 700, fontStyle: 'italic', display: 'inline-block' }}> beautiful </span>
                        {prepareText("shift my world has ever known.")}
                    </p>

                    <p ref={el => paragraphsRef.current[1] = el} style={{ marginBottom: '2.5rem' }}>
                        {prepareText("In your smile, I find a kind of peace I never knew existed. In your eyes, I see a future that is")}
                        <span className="rose-gold-glow" style={{ display: 'inline-block' }}> brighter and kinder </span>
                        {prepareText("than any dream I've ever had. You are the poetry I never knew I could write.")}
                    </p>

                    <p ref={el => paragraphsRef.current[2] = el} style={{ marginBottom: '2.5rem' }}>
                        {prepareText("Every heartbeat of mine carries a piece of your laughter, a memory of your warmth. This little corner of the digital world is a sanctuary for us, a place where I can remind you that you are")}
                        <span className="rose-gold-glow" style={{ display: 'inline-block' }}> loved beyond measure</span>.
                    </p>

                    <p ref={el => paragraphsRef.current[3] = el} style={{ marginBottom: '2.5rem' }}>
                        {prepareText("I promise to hold your hand through the storms and dance with you in the sunlight. You are my heart's home, and I am yours,")}
                        <span className="rose-gold-glow" style={{ textDecoration: 'underline decoration-dotted', display: 'inline-block' }}> forever</span>.
                    </p>
                </div>

                <div
                    ref={signatureRef}
                    className="milky-font signature"
                    style={{
                        fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
                        marginTop: '6rem',
                        alignSelf: 'flex-end',
                        color: '#B76E79',
                        paddingRight: '2rem',
                        textAlign: 'right'
                    }}
                >
                    Forever Yours,<br />
                    Boomer Nilu
                </div>

                {/* Ornate bottom divider */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    marginTop: '5rem',
                    opacity: 0.4
                }}>
                    <div style={{ width: 'clamp(60px, 15vw, 120px)', height: '1.5px', background: 'linear-gradient(to right, transparent, #B76E79)' }} />
                    <div style={{ color: '#B76E79', fontSize: '1.5rem' }}>❧</div>
                    <div style={{ width: 'clamp(60px, 15vw, 120px)', height: '1.5px', background: 'linear-gradient(to left, transparent, #B76E79)' }} />
                </div>
            </div>

            <style>{`
        .word {
          transition: transform 0.3s ease, color 0.3s ease;
        }
        .word:hover {
          transform: translateY(-3px) scale(1.1);
          color: #B76E79;
        }
        @media (max-width: 600px) {
          .letter-card {
            padding: 5rem 1.5rem 7rem 1.5rem !important;
          }
        }
      `}</style>
        </section>
    );
};

export default LoveLetter;
