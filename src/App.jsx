import React, { useState, useEffect, useRef } from 'react';
import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import LoveLetter from './components/LoveLetter';
import gsap from 'gsap';

function App() {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  const handleOpenHeart = () => {
    setIsOpen(true);
    // Smooth scroll to the letter section after opening
    setTimeout(() => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }, 100);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play blocked", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="app-container">
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {!loading && (
        <>
          <HeroSection onOpen={handleOpenHeart} />
          {isOpen && <LoveLetter />}

          {/* Subtle Music Control */}
          <div
            onClick={toggleMusic}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              zIndex: 1000,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              color: isOpen ? 'var(--color-celestial-gold)' : 'white',
              fontSize: '0.9rem',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              transition: 'color 0.5s ease'
            }}
          >
            <div className={`music-indicator ${isPlaying ? 'playing' : ''}`}>
              {[...Array(4)].map((_, i) => <span key={i} />)}
            </div>
            {isPlaying ? 'Melody Playing' : 'Ambient Music'}

            <audio
              ref={audioRef}
              loop
              src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Placeholder romantic-ish track
            />
          </div>
        </>
      )}

      <style>{`
        .music-indicator {
          display: flex;
          align-items: flex-end;
          gap: 3px;
          height: 15px;
        }
        .music-indicator span {
          width: 2px;
          height: 100%;
          background: currentColor;
          border-radius: 1px;
          transition: height 0.3s ease;
        }
        .music-indicator.playing span {
          animation: music-bar 0.6s infinite ease-in-out alternate;
        }
        .music-indicator.playing span:nth-child(1) { animation-delay: 0.1s; height: 60%; }
        .music-indicator.playing span:nth-child(2) { animation-delay: 0.3s; height: 100%; }
        .music-indicator.playing span:nth-child(3) { animation-delay: 0.2s; height: 80%; }
        .music-indicator.playing span:nth-child(4) { animation-delay: 0.4s; height: 40%; }

        @keyframes music-bar {
          0% { height: 20%; }
          100% { height: 100%; }
        }
      `}</style>
    </div>
  );
}

export default App;
