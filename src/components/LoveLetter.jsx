import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LoveLetter = () => {
    const containerRef = useRef();
    const letterRef = useRef();
    const paragraphsRef = useRef([]);
    const signatureRef = useRef();
    const meteorsRef = useRef();

    // Generate background stars once
    const backgroundStars = useMemo(() => {
        return [...Array(50)].map((_, i) => ({
            id: i,
            top: Math.random() * 100,
            left: Math.random() * 100,
            opacity: Math.random() * 0.5,
            duration: Math.random() * 5 + 3
        }));
    }, []);

    useEffect(() => {
        // Meteor Shower Animation
        const createMeteor = () => {
            if (!meteorsRef.current) return;
            const meteor = document.createElement('div');
            meteor.style.position = 'absolute';
            meteor.style.width = '2px';
            meteor.style.height = '100px';
            meteor.style.background = 'linear-gradient(to bottom, rgba(255, 215, 0, 0.8), transparent)';
            meteor.style.top = '-100px';
            meteor.style.left = Math.random() * 100 + 'vw';
            meteor.style.transform = 'rotate(45deg)';
            meteor.style.opacity = '0';
            meteorsRef.current.appendChild(meteor);

            gsap.to(meteor, {
                y: '100vh',
                x: '100vw',
                opacity: 1,
                duration: 1.5,
                ease: "none",
                onComplete: () => meteor.remove()
            });
        };

        const meteorInterval = setInterval(createMeteor, 4000);

        // Letter Card Hover tilt (Stellar Parallax)
        const handleMouseMove = (e) => {
            if (!letterRef.current) return;
            const { clientX, clientY } = e;
            const { left, top, width, height } = letterRef.current.getBoundingClientRect();
            const x = (clientX - left) / width - 0.5;
            const y = (clientY - top) / height - 0.5;

            gsap.to(letterRef.current, {
                rotationY: x * 10,
                rotationX: -y * 10,
                transformPerspective: 1000,
                duration: 0.8,
                ease: "power2.out"
            });
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Fade reveal for card
        gsap.fromTo(letterRef.current,
            { opacity: 0, scale: 0.9, y: 100 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 2,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: letterRef.current,
                    start: "top 80%"
                }
            }
        );

        // Staggered word reveal with "stardust" feel
        paragraphsRef.current.forEach((para) => {
            if (!para) return;
            const words = para.querySelectorAll('.word');
            gsap.to(words, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1.5,
                stagger: 0.05,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: para,
                    start: "top 85%"
                }
            });
        });

        // Signature Fade
        gsap.fromTo(signatureRef.current,
            { opacity: 0, x: 20 },
            {
                opacity: 1,
                x: 0,
                duration: 2,
                scrollTrigger: {
                    trigger: signatureRef.current,
                    start: "top 90%"
                }
            }
        );

        return () => {
            clearInterval(meteorInterval);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const prepareText = (text) => {
        return text.split(' ').map((word, i) => (
            <span key={i} className="word" style={{
                display: 'inline-block',
                opacity: 0,
                transform: 'translateY(10px)',
                filter: "blur(5px)",
                marginRight: '0.25em',
                transition: 'color 0.3s'
            }}>
                {word}
            </span>
        ));
    };

    return (
        <section
            ref={containerRef}
            style={{
                minHeight: '200vh',
                padding: '20vh 5vw',
                background: 'var(--color-midnight)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div ref={meteorsRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />

            {/* Background Distant Stars */}
            {backgroundStars.map((s) => (
                <div key={s.id} style={{
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    background: 'white',
                    top: s.top + '%',
                    left: s.left + '%',
                    opacity: s.opacity,
                    animation: `star-twinkle ${s.duration}s infinite`
                }} />
            ))}

            <div
                ref={letterRef}
                className="glass-celestial gold-border"
                style={{
                    width: '100%',
                    maxWidth: '900px',
                    margin: '0 auto',
                    padding: 'clamp(3rem, 10vw, 6rem)',
                    borderRadius: '1rem',
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transformStyle: 'preserve-3d'
                }}
            >
                {/* Constellation Lines (Static Decor) */}
                <svg style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none', width: '100%', height: '100%' }}>
                    <line x1="10%" y1="10%" x2="40%" y2="20%" stroke="var(--color-celestial-gold)" strokeWidth="1" />
                    <line x1="40%" y1="20%" x2="60%" y2="5%" stroke="var(--color-celestial-gold)" strokeWidth="1" />
                    <line x1="60%" y1="5%" x2="90%" y2="15%" stroke="var(--color-celestial-gold)" strokeWidth="1" />
                    <circle cx="10%" cy="10%" r="2" fill="var(--color-celestial-gold)" />
                    <circle cx="40%" cy="20%" r="2" fill="var(--color-celestial-gold)" />
                    <circle cx="60%" cy="5%" r="2" fill="var(--color-celestial-gold)" />
                    <circle cx="90%" cy="15%" r="2" fill="var(--color-celestial-gold)" />
                </svg>

                <h2
                    className="milky-font star-glow"
                    style={{
                        fontSize: 'clamp(3rem, 12vw, 6rem)',
                        color: 'var(--color-celestial-gold)',
                        marginBottom: '4rem',
                        textAlign: 'center'
                    }}
                >
                    My Universe,
                </h2>

                <div className="biglla-font" style={{ width: '100%', fontSize: 'clamp(1.1rem, 4vw, 1.4rem)', lineHeight: 1.8, color: 'var(--color-starlight)' }}>
                    <p ref={el => paragraphsRef.current[0] = el} style={{ marginBottom: '2.5rem' }}>
                        {prepareText("In the vast expanse of time and space, I found something more radiant than any star—you. You are the gravity that holds my world together, the light that guides me through the darkest voids.")}
                    </p>

                    <p ref={el => paragraphsRef.current[1] = el} style={{ marginBottom: '2.5rem' }}>
                        {prepareText("I used to look at the night sky and feel small, but now, knowing you are in this world with me, I feel as infinite as the cosmos itself. Every laugh we share is a new constellation born in my heart.")}
                    </p>

                    <p ref={el => paragraphsRef.current[2] = el} style={{ marginBottom: '2.5rem' }}>
                        {prepareText("No matter where the cosmic winds take us, I will always orbit around the joy you bring. This letter is a map of my soul, where every path lead back to the love I have for you.")}
                    </p>

                    <p ref={el => paragraphsRef.current[3] = el} style={{ marginBottom: '2.5rem' }}>
                        {prepareText("Until the last star fades and the universe grows cold, I will be yours, steady and bright, across all dimensions.")}
                    </p>
                </div>

                <div
                    ref={signatureRef}
                    className="milky-font star-glow"
                    style={{
                        fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                        marginTop: '6rem',
                        alignSelf: 'flex-end',
                        color: 'var(--color-celestial-gold)',
                        textAlign: 'right'
                    }}
                >
                    Yours Eternally,<br />
                    Boomer Nilu
                </div>

                {/* Ambient Orbiting Star */}
                <div style={{
                    position: 'absolute',
                    width: '20px',
                    height: '20px',
                    background: 'var(--color-celestial-gold)',
                    borderRadius: '50%',
                    filter: 'blur(5px)',
                    bottom: '2rem',
                    left: '2rem',
                    opacity: 0.3,
                    animation: 'nebula-pulse 5s infinite ease-in-out'
                }} />
            </div>

            <style>{`
        .word:hover {
            color: var(--color-celestial-gold);
            text-shadow: 0 0 10px var(--color-celestial-gold);
        }
      `}</style>
        </section>
    );
};

export default LoveLetter;
