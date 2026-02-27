import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

class Star {
    constructor(width, height) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random();
    }
    update(width, height) {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
    }
    draw(ctx) {
        ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const HeroSection = ({ onOpen }) => {
    const canvasRef = useRef();
    const titleRef = useRef();
    const subtextRef = useRef();
    const buttonRef = useRef();
    const sectionRef = useRef();

    useEffect(() => {
        // GSAP Intro Animation
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.to(sectionRef.current, { opacity: 1, duration: 2.5 })
            .from(titleRef.current, { y: 100, opacity: 0, letterSpacing: '20px', duration: 2 }, "-=2")
            .from(subtextRef.current, { opacity: 0, y: 20, duration: 1.5 }, "-=1.5")
            .from(buttonRef.current, { scale: 0, opacity: 0, duration: 1.5, ease: "back.out(1.7)" }, "-=1");

        // Canvas Constellation Animation
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let stars = [];
        const mouse = { x: null, y: null };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const init = () => {
            stars = [];
            const count = 150;
            for (let i = 0; i < count; i++) {
                stars.push(new Star(canvas.width, canvas.height));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach(star => {
                star.update(canvas.width, canvas.height);
                star.draw(ctx);

                // Connect stars near mouse
                const dx = mouse.x - star.x;
                const dy = mouse.y - star.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.strokeStyle = `rgba(255, 215, 0, ${1 - dist / 150})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(mouse.x, mouse.y);
                    ctx.lineTo(star.x, star.y);
                    ctx.stroke();
                }
            });
            requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);
        init();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
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
                background: 'var(--color-midnight)'
            }}
        >
            <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

            {/* Nebula Overlays */}
            <div
                style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '40vw',
                    height: '40vw',
                    background: 'var(--color-nebula-purple)',
                    filter: 'blur(100px)',
                    opacity: 0.1,
                    borderRadius: '50%',
                    animation: 'nebula-pulse 10s infinite alternate ease-in-out'
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '5%',
                    width: '50vw',
                    height: '50vw',
                    background: 'var(--color-nebula-pink)',
                    filter: 'blur(120px)',
                    opacity: 0.1,
                    borderRadius: '50%',
                    animation: 'nebula-pulse 15s infinite alternate-reverse ease-in-out'
                }}
            />

            <div style={{ position: 'relative', zIndex: 10, maxWidth: '1100px', padding: '0 2rem' }}>
                <h1
                    ref={titleRef}
                    className="milky-font star-glow"
                    style={{
                        fontSize: 'clamp(4rem, 15vw, 10rem)',
                        color: 'var(--color-celestial-gold)',
                        lineHeight: 0.9,
                        marginBottom: '2rem'
                    }}
                >
                    Love Written<br />In The Stars
                </h1>
                <p
                    ref={subtextRef}
                    className="biglla-font"
                    style={{
                        fontSize: 'clamp(1rem, 4vw, 1.8rem)',
                        color: 'var(--color-starlight)',
                        opacity: 0.8,
                        letterSpacing: '8px',
                        textTransform: 'uppercase',
                        marginBottom: '4rem'
                    }}
                >
                    Across the cosmos, my heart finds you
                </p>

                <button
                    ref={buttonRef}
                    onClick={onOpen}
                    className="glass-celestial"
                    style={{
                        padding: '1.5rem 5rem',
                        borderRadius: '100px',
                        fontSize: '1.2rem',
                        color: 'var(--color-starlight)',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        cursor: 'pointer',
                        transition: 'var(--transition-cinematic)',
                        boxShadow: '0 0 30px rgba(255, 215, 0, 0.2)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                        gsap.to(e.target, {
                            scale: 1.05,
                            boxShadow: '0 0 50px rgba(255, 215, 0, 0.5)',
                            backgroundColor: 'rgba(255, 215, 0, 0.1)'
                        });
                    }}
                    onMouseLeave={(e) => {
                        gsap.to(e.target, {
                            scale: 1,
                            boxShadow: '0 0 30px rgba(255, 215, 0, 0.2)',
                            backgroundColor: 'rgba(26, 27, 41, 0.6)'
                        });
                    }}
                >
                    Enter the Cosmos
                </button>
            </div>
        </section>
    );
};

export default HeroSection;
