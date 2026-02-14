import useLoading from './hooks/useLoading'
import Loading from './components/loading'
import Frames from './components/frames'
import Navbar from './components/navbar'
import HeroOverlay from './components/HeroOverlay'
import About from './components/About'
import Skills from './components/Skills'
import Certificates from './components/Certificates'

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



      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Conteúdo principal
      </div>

      <Certificates />


      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        outro container
      </div>



    </>
  )
}
