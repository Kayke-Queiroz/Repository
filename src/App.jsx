import useLoading from './hooks/useLoading'
import Loading from './components/Loading'

export default function App() {
  const isLoading = useLoading(2000) // tempo de exibição do loading 

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          Conteúdo principal
        </div>
      )}
    </>
  )
}
