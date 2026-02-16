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
import BackgroundParticles from './components/BackgroundParticles'

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
      <BackgroundParticles show={showParticles} />

      <div className="relative z-content">
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
