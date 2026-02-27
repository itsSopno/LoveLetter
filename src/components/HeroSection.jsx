import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const HeroSection = ({ onOpen }) => {
    const sectionRef = useRef();
    const titleRef = useRef();
    const subtextRef = useRef();
    const buttonRef = useRef();
    const bgRef = useRef();
    const bokehContainerRef = useRef();
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Generate particles once on mount to keep render pure
        const particleData = [...Array(30)].map((_, i) => ({
            id: i,
            size: Math.random() * 5 + 2,
            top: Math.random() * 100,
            left: Math.random() * 100,
            opacity: Math.random() * 0.5,
            delay: Math.random() * 15,
            duration: Math.random() * 15 + 10,
            translateX: Math.random() * 100 - 50
        }));
        setParticles(particleData);

        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        tl.to(sectionRef.current, { opacity: 1, duration: 2 })
            .fromTo(titleRef.current, { y: 150, opacity: 0, rotate: -5 }, { y: 0, opacity: 1, rotate: -2, duration: 2 }, "-=1.5")
            .fromTo(subtextRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 0.9, duration: 1.5 }, "-=1.2")
            .fromTo(buttonRef.current, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: "back.out(1.7)" }, "-=1");

        // Parallax effect on mouse move
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 30;
            const yPos = (clientY / window.innerHeight - 0.5) * 30;

            gsap.to(bgRef.current, {
                x: xPos,
                y: yPos,
                duration: 2.5,
                ease: "power2.out"
            });

            // Magnetic Button effect
            if (buttonRef.current) {
                const rect = buttonRef.current.getBoundingClientRect();
                const btnX = rect.left + rect.width / 2;
                const btnY = rect.top + rect.height / 2;
                const distX = clientX - btnX;
                const distY = clientY - btnY;

                if (Math.abs(distX) < 150 && Math.abs(distY) < 150) {
                    gsap.to(buttonRef.current, {
                        x: distX * 0.2,
                        y: distY * 0.2,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                } else {
                    gsap.to(buttonRef.current, { x: 0, y: 0, duration: 0.5 });
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Dynamic Bokeh
        const createBokeh = () => {
            if (!bokehContainerRef.current) return;
            const b = document.createElement('div');
            const size = Math.random() * 100 + 50;
            b.style.width = size + 'px';
            b.style.height = size + 'px';
            b.style.background = 'rgba(255, 255, 255, 0.1)';
            b.style.borderRadius = '50%';
            b.style.filter = 'blur(30px)';
            b.style.position = 'absolute';
            b.style.left = Math.random() * 100 + '%';
            b.style.top = Math.random() * 100 + '%';
            b.style.animation = `float-bokeh ${Math.random() * 10 + 10}s infinite ease-in-out`;
            bokehContainerRef.current.appendChild(b);

            setTimeout(() => b.remove(), 20000);
        };

        const bokehInterval = setInterval(createBokeh, 1500);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(bokehInterval);
        };
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
            <div ref={bokehContainerRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }} />

            {/* Background with Parallax */}
            <div
                ref={bgRef}
                style={{
                    position: 'absolute',
                    top: '-15%',
                    left: '-15%',
                    width: '130%',
                    height: '130%',
                    backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(/src/assets/sunset_gradient.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: -1,
                    filter: 'contrast(1.1) brightness(0.9)'
                }}
            />

            <div style={{ maxWidth: '1000px', padding: '0 2rem', position: 'relative', zIndex: 10 }}>
                <h1
                    ref={titleRef}
                    className="milky-font soft-glow"
                    style={{
                        fontSize: 'clamp(3.5rem, 12vw, 8rem)',
                        lineHeight: 1,
                        marginBottom: '1.5rem',
                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))'
                    }}
                >
                    To The One Who<br />Owns My Heart
                </h1>
                <p
                    ref={subtextRef}
                    className="biglla-font"
                    style={{
                        fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                        fontWeight: 300,
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                        marginBottom: '4rem',
                        opacity: 0.8
                    }}
                >
                    This little world is only for you
                </p>

                <button
                    ref={buttonRef}
                    onClick={onOpen}
                    className="glass-effect"
                    style={{
                        padding: '1.5rem 4rem',
                        borderRadius: '100px',
                        fontSize: '1.4rem',
                        color: 'white',
                        fontWeight: 500,
                        boxShadow: '0 0 50px rgba(255, 192, 203, 0.3), inset 0 0 20px rgba(255,255,255,0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(15px)',
                        transition: 'background 0.3s ease, box-shadow 0.3s ease',
                        fontFamily: 'var(--font-serif)'
                    }}
                    onMouseEnter={(e) => {
                        gsap.to(e.target, { backgroundColor: 'rgba(255, 255, 255, 0.2)', boxShadow: '0 0 70px rgba(255, 192, 203, 0.6)', duration: 0.3 });
                    }}
                    onMouseLeave={(e) => {
                        gsap.to(e.target, { backgroundColor: 'rgba(255, 255, 255, 0.1)', boxShadow: '0 0 50px rgba(255, 192, 203, 0.3)', duration: 0.3 });
                    }}
                >
                    Open My Heart
                </button>
            </div>

            {/* Floating particles */}
            {particles.map((p) => (
                <div
                    key={p.id}
                    style={{
                        position: 'absolute',
                        width: p.size + 'px',
                        height: p.size + 'px',
                        background: 'rgba(255, 255, 255, 0.6)',
                        borderRadius: '50%',
                        top: p.top + '%',
                        left: p.left + '%',
                        filter: 'blur(1px)',
                        opacity: p.opacity,
                        animation: `float-particles-${p.id} ${p.duration}s infinite ease-in-out`,
                        animationDelay: `${-p.delay}s`
                    }}
                >
                    <style>{`
            @keyframes float-particles-${p.id} {
              0%, 100% { transform: translateY(0) translateX(0); }
              50% { transform: translateY(-100px) translateX(${p.translateX}px); }
            }
          `}</style>
                </div>
            ))}
        </section>
    );
};

export default HeroSection;
