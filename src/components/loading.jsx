import { useEffect, useRef } from 'react'
import loadingVideo from '../assets/videos/loading.mp4'

export default function Loading() {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 5
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        src={loadingVideo}
        autoPlay
        muted
        playsInline
        className="
          w-full
          h-[100dvh]
          object-contain
        "
      />
    </div>
  )
}
