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

        // New Sliding & Scaling Reveal Animation for the Letter Card
        gsap.fromTo(letterRef.current,
            {
                y: 200,
                opacity: 0,
                scale: 0.8,
                rotationX: -20
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                rotationX: 0,
                duration: 1.8,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: letterRef.current,
                    start: "top 90%",
                }
            }
        );

        // Staggered reveal for the title
        gsap.fromTo(titleRef.current,
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                delay: 0.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 85%",
                }
            }
        );

        // Staggered Word Reveal for paragraphs
        paragraphsRef.current.forEach((para, i) => {
            if (!para) return;

            // Split text into words if not already done
            const originalText = para.innerText;
            para.innerHTML = originalText.split(' ').map(word => `<span class="word" style="display:inline-block; opacity:0; transform:translateY(10px)">${word}</span>`).join(' ');

            const words = para.querySelectorAll('.word');

            gsap.to(words, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.05,
                ease: "power2.out",
                delay: 0.2,
                scrollTrigger: {
                    trigger: para,
                    start: "top 80%",
                }
            });
        });

        // Signature reveal
        gsap.fromTo(signatureRef.current,
            { x: 50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1.5,
                delay: 0.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: signatureRef.current,
                    start: "top 90%",
                }
            }
        );

        // Floating particles (enhanced for performance)
        const petals = ['🌸', '🌹', '✨', '🤍'];
        const createPetal = () => {
            if (!containerRef.current) return;
            const p = document.createElement('div');
            p.innerHTML = petals[Math.floor(Math.random() * petals.length)];
            p.style.position = 'absolute';
            p.style.left = Math.random() * 100 + 'vw';
            p.style.top = '-50px';
            p.style.fontSize = (Math.random() * (isMobile ? 15 : 25) + 10) + 'px';
            p.style.opacity = Math.random() * 0.4 + 0.3;
            p.style.pointerEvents = 'none';
            p.style.filter = `blur(${Math.random() * 2}px)`;
            containerRef.current.appendChild(p);

            gsap.to(p, {
                y: '220vh',
                x: (Math.random() - 0.5) * 400,
                rotation: Math.random() * 1000,
                duration: Math.random() * 12 + 8,
                ease: "none",
                onComplete: () => p.remove()
            });
        };

        const petalInterval = setInterval(createPetal, isMobile ? 1200 : 800);

        return () => {
            clearInterval(petalInterval);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const addToRefs = (el) => {
        if (el && !paragraphsRef.current.includes(el)) {
            paragraphsRef.current.push(el);
        }
    };

    return (
        <section
            ref={containerRef}
            className="letter-section"
            style={{
                minHeight: '180vh',
                padding: '10vh 5vw',
                background: '#FAF9F6',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div className="vignette-overlay" />

            <div
                ref={letterRef}
                className="ornate-frame letter-card"
                style={{
                    width: '100%',
                    maxWidth: '800px',
                    margin: '0 auto',
                    background: 'url(/src/assets/vintage_paper.png)',
                    backgroundSize: 'cover',
                    padding: 'clamp(3rem, 10vw, 6rem) clamp(2rem, 8vw, 4rem)',
                    borderRadius: '4px',
                    boxShadow: '0 30px 60px rgba(183, 110, 121, 0.15), 0 10px 20px rgba(0,0,0,0.05)',
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
                    inset: '15px',
                    border: '1px solid rgba(183, 110, 121, 0.2)',
                    pointerEvents: 'none',
                    borderRadius: '2px'
                }} />

                {/* Digital Wax Seal */}
                <div
                    ref={waxSealRef}
                    className="wax-seal"
                    style={{
                        position: 'absolute',
                        top: '-40px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 'clamp(60px, 15vw, 80px)',
                        height: 'clamp(60px, 15vw, 80px)',
                        background: 'radial-gradient(circle, #8B0000 0%, #D40000 100%)',
                        borderRadius: '50%',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                        border: '4px solid #8B0000'
                    }}
                >
                    <div style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', color: 'rgba(255,215,0,0.7)', filter: 'drop-shadow(0 1px 2px black)' }}>
                        ❤️
                    </div>
                </div>

                <div
                    ref={titleRef}
                    className="romantic-font letter-title"
                    style={{
                        fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
                        color: '#B76E79',
                        marginBottom: '3rem',
                        textAlign: 'center'
                    }}
                >
                    My Dearest,
                </div>

                <div className="letter-body" style={{ width: '100%', fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.1rem, 4vw, 1.3rem)', lineHeight: 1.8, color: '#2D2424' }}>
                    <p ref={addToRefs} style={{ marginBottom: '1.5rem' }}>
                        I wrote this letter today because I wanted you to know how much you truly mean to me.
                        There are moments in life that change everything, and meeting you was the most
                        beautiful shift my world has ever known.
                    </p>

                    <p ref={addToRefs} style={{ marginBottom: '1.5rem' }}>
                        In your smile, I find a kind of peace I never knew existed. In your eyes, I see
                        a future that is brighter and kinder than any
                        dream I've ever had. You are the poetry I never knew I could write.
                    </p>

                    <p ref={addToRefs} style={{ marginBottom: '1.5rem' }}>
                        Every heartbeat of mine carries a piece of your laughter, a memory of your warmth.
                        This little corner of the digital world is a sanctuary for us, a place where I can
                        remind you that you are loved beyond measure.
                    </p>

                    <p ref={addToRefs} style={{ marginBottom: '1.5rem' }}>
                        I promise to hold your hand through the storms and dance with you in the sunlight.
                        You are my heart's home, and I am yours, forever.
                    </p>
                </div>

                <div
                    ref={signatureRef}
                    className="romantic-font signature"
                    style={{
                        fontSize: 'clamp(2rem, 6vw, 2.8rem)',
                        marginTop: '4rem',
                        alignSelf: 'flex-end',
                        color: '#B76E79',
                        transform: 'rotate(-3deg)',
                        paddingRight: '1rem'
                    }}
                >
                    Forever Yours,<br />
                    Boomer Nilu
                </div>

                {/* Ornate bottom divider */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginTop: '3rem',
                    opacity: 0.3
                }}>
                    <div style={{ width: 'clamp(40px, 10vw, 80px)', height: '1px', background: '#B76E79' }} />
                    <div style={{ color: '#B76E79' }}>❧</div>
                    <div style={{ width: 'clamp(40px, 10vw, 80px)', height: '1px', background: '#B76E79' }} />
                </div>
            </div>

            <style>{`
        .word {
          margin-right: 0.25em;
        }
        @media (max-width: 600px) {
          .letter-card {
            padding: 4rem 1.5rem 6rem 1.5rem !important;
          }
          .ornate-frame::before, .ornate-frame::after {
            display: none;
          }
        }
      `}</style>
        </section>
    );
};

export default LoveLetter;
