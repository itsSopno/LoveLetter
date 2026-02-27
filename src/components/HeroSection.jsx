import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HeroSection = ({ onOpen }) => {
    const sectionRef = useRef();
    const titleRef = useRef();
    const subtextRef = useRef();
    const buttonRef = useRef();
    const bgRef = useRef();

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(sectionRef.current, { opacity: 1, duration: 1.5 })
            .fromTo(titleRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, "-=1")
            .fromTo(subtextRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 0.8, duration: 1 }, "-=0.8")
            .fromTo(buttonRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" }, "-=0.6");

        // Parallax effect on mouse move
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 20;
            const yPos = (clientY / window.innerHeight - 0.5) * 20;

            gsap.to(bgRef.current, {
                x: xPos,
                y: yPos,
                duration: 2,
                ease: "power2.out"
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section
            ref={sectionRef}
            style={{
                height: '100vh',
                width: '100%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                opacity: 0,
                overflow: 'hidden',
                color: 'white'
            }}
        >
            {/* Background with Parallax */}
            <div
                ref={bgRef}
                style={{
                    position: 'absolute',
                    top: '-10%',
                    left: '-10%',
                    width: '120%',
                    height: '120%',
                    backgroundImage: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(/src/assets/sunset_gradient.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: -1
                }}
            />

            <div style={{ maxWidth: '800px', padding: '0 2rem' }}>
                <h1
                    ref={titleRef}
                    // className="romantic-font"
                    className='milky-font'
                    style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', lineHeight: 1.1, marginBottom: '1rem' }}
                >
                    To The One Who<br />Owns My Heart
                </h1>
                <p
                    ref={subtextRef}
                    className='biglla-font'
                    style={{ fontSize: '1.2rem', fontWeight: 300, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '3rem' }}
                >
                    This little world is only for you
                </p>

                <button
                    ref={buttonRef}
                    onClick={onOpen}
                    className="glass-effect"
                    style={{
                        padding: '1.2rem 3rem',
                        borderRadius: '50px',
                        fontSize: '1.2rem',
                        color: 'white',
                        fontWeight: 500,
                        boxShadow: '0 0 30px rgba(255, 192, 203, 0.4)',
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}
                    onMouseEnter={(e) => gsap.to(e.target, { scale: 1.1, duration: 0.3 })}
                    onMouseLeave={(e) => gsap.to(e.target, { scale: 1, duration: 0.3 })}
                >
                    Open My Heart
                </button>
            </div>

            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        width: Math.random() * 4 + 2 + 'px',
                        height: Math.random() * 4 + 2 + 'px',
                        background: 'rgba(255,255,255,0.4)',
                        borderRadius: '50%',
                        top: Math.random() * 100 + '%',
                        left: Math.random() * 100 + '%',
                        filter: 'blur(1px)',
                        animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`
                    }}
                />
            ))}

            <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * -100}px); }
        }
      `}</style>
        </section>
    );
};

export default HeroSection;
