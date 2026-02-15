import { useState, useEffect } from 'react'
import useLoading from './hooks/useLoading'
import Loading from './components/loading'
import Frames from './components/frames'
import Navbar from './components/navbar'
import HeroOverlay from './components/HeroOverlay'
import About from './components/About'
import Journey from './components/Journey'
import Skills from './components/Skills'
import Certificates from './components/Certificates'
import Projects from './components/Projects'
import Footer from './components/Footer'
import TechParticles from './components/TechParticles'

const ENABLE_LOADING = false

export default function App() {
  const isLoading = useLoading(2000)
  const shouldShowLoading = ENABLE_LOADING && isLoading
  const [showParticles, setShowParticles] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show particles after scrolling past Hero (approx 100vh)
      const threshold = window.innerHeight * 0.8;
      setShowParticles(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  if (shouldShowLoading) {
    return <Loading />
  }

  return (
    <>
      <Navbar />
      <HeroOverlay />
      <Frames />

      {/* Background Particles - Visible only after Hero */}
      <div
        className={`fixed inset-0 z-0 transition-opacity duration-1000 ${showParticles ? 'opacity-50' : 'opacity-0'}`}
        style={{ pointerEvents: 'none' }}
      >
        <TechParticles
          options={{
            color: '#22d3ee',
            connectDistance: 130, // Conexões mais longas
            particleCount: 100,   // Mais partículas
            mouseDistance: 200    // Raio de interação maior
          }}
          className="pointer-events-auto"
        />
      </div>

      <div className="relative z-10">
        <About />
        <Journey />
        <Skills />
        <Projects />
        <Certificates />
        <Footer />
      </div>
    </>
  )
}
