import useLoading from './hooks/useLoading'
import Loading from './components/loading'

const ENABLE_LOADING = false

export default function App() {
  const isLoading = useLoading(2000) // tempo de exibição do loading
  const shouldShowLoading = ENABLE_LOADING && isLoading

  return (
    <>
      {shouldShowLoading && <Loading />}
      {!shouldShowLoading && (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          Conteúdo principal
        </div>
      )}
    </>
  )
}
