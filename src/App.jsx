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

const ENABLE_LOADING = false

export default function App() {
  const isLoading = useLoading(2000)
  const shouldShowLoading = ENABLE_LOADING && isLoading

  if (shouldShowLoading) {
    return <Loading />
  }

  return (
    <>
      <Navbar />
      <HeroOverlay />
      <Frames />
      <About />
      <Journey />
      <Skills />
      <Projects />
      <Certificates />
      <Footer />
    </>
  )
}
