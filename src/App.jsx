import useLoading from './hooks/useLoading'
import Loading from './components/loading'
import Frames from './components/frames'
import Navbar from './components/navbar'
import HeroOverlay from './components/HeroOverlay'

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
      
      
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Conteúdo principal
      </div>

      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        outro container
      </div>
    </>
  )
}
