import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LoveLetter = () => {
    const containerRef = useRef();
    const letterRef = useRef();
    const paragraphsRef = useRef([]);

    useEffect(() => {
        // Fade in the letter card
        gsap.fromTo(letterRef.current,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: letterRef.current,
                    start: "top 80%",
                }
            }
        );

        // Fade in paragraphs on scroll
        paragraphsRef.current.forEach((el, i) => {
            gsap.fromTo(el,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: i * 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                    }
                }
            );
        });

        // Floating rose petals animation
        const createPetal = () => {
            const p = document.createElement('div');
            p.innerHTML = '🌸';
            p.style.position = 'absolute';
            p.style.left = Math.random() * 100 + 'vw';
            p.style.top = '-50px';
            p.style.fontSize = (Math.random() * 20 + 10) + 'px';
            p.style.opacity = Math.random() * 0.6 + 0.2;
            p.style.pointerEvents = 'none';
            containerRef.current.appendChild(p);

            gsap.to(p, {
                y: '200vh',
                x: (Math.random() - 0.5) * 300,
                rotation: Math.random() * 720,
                duration: Math.random() * 10 + 10,
                ease: "none",
                onComplete: () => p.remove()
            });
        };

        const petalInterval = setInterval(createPetal, 1500);
        return () => clearInterval(petalInterval);
    }, []);

    const addToRefs = (el) => {
        if (el && !paragraphsRef.current.includes(el)) {
            paragraphsRef.current.push(el);
        }
    };

    return (
        <section
            ref={containerRef}
            style={{
                minHeight: '150vh',
                padding: '10vh 2rem',
                background: '#FAF9F6',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div
                ref={letterRef}
                style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    background: 'url(/src/assets/vintage_paper.png)',
                    backgroundSize: 'cover',
                    padding: '4rem',
                    borderRadius: '8px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1)',
                    position: 'relative',
                    minHeight: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <div
                    className="romantic-font"
                    style={{ fontSize: '2.5rem', color: '#B76E79', marginBottom: '3rem' }}
                >
                    My Dearest,
                </div>

                <div style={{ width: '100%', fontFamily: 'var(--font-serif)', fontSize: '1.2rem', lineHeight: 1.8, color: '#2D2424' }}>
                    <p ref={addToRefs} style={{ marginBottom: '1.5rem' }}>
                        I wrote this letter today because I wanted you to know how much you truly mean to me.
                        There are moments in life that change everything, and meeting you was the most
                        <span className="rose-gold-text"> beautiful</span> shift my world has ever known.
                    </p>

                    <p ref={addToRefs} style={{ marginBottom: '1.5rem' }}>
                        In your smile, I find a kind of peace I never knew existed. In your eyes, I see
                        a future that is <span className="rose-gold-text">brighter and kinder</span> than any
                        dream I've ever had. You are the poetry I never knew I could write.
                    </p>

                    <p ref={addToRefs} style={{ marginBottom: '1.5rem' }}>
                        Every heartbeat of mine carries a piece of your laughter, a memory of your warmth.
                        This little corner of the digital world is a sanctuary for us, a place where I can
                        remind you that you are <span className="rose-gold-text">loved beyond measure</span>.
                    </p>

                    <p ref={addToRefs} style={{ marginBottom: '1.5rem' }}>
                        I promise to hold your hand through the storms and dance with you in the sunlight.
                        You are my heart's home, and I am yours, <span className="rose-gold-text">forever</span>.
                    </p>
                </div>

                <div
                    ref={addToRefs}
                    className="romantic-font"
                    style={{
                        fontSize: '2rem',
                        marginTop: '4rem',
                        alignSelf: 'flex-end',
                        color: '#B76E79'
                    }}
                >
                    Forever Yours,<br />
                    [Your Name]
                </div>

                {/* Small rose gold divider */}
                <div style={{
                    width: '60px',
                    height: '2px',
                    background: '#B76E79',
                    marginTop: '3rem',
                    opacity: 0.4
                }} />
            </div>

            {/* Music Toggle UI could go here */}
        </section>
    );
};

export default LoveLetter;
