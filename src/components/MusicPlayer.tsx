import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Volume2, VolumeX } from "lucide-react"

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
            } else {
                audioRef.current.play().catch(err => console.log("Audio play failed:", err))
            }
            setIsPlaying(!isPlaying)
        }
    }

    useEffect(() => {
        // We can't auto-play without user interaction in most browsers
        // But we can set the volume
        if (audioRef.current) {
            audioRef.current.volume = 0.4
        }

        const handleFirstInteraction = () => {
            if (audioRef.current && !isPlaying) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true)
                }).catch(err => console.log("Audio play failed:", err))
            }
            // Remove listener after first interaction
            document.removeEventListener('click', handleFirstInteraction)
            document.removeEventListener('touchstart', handleFirstInteraction)
        }

        document.addEventListener('click', handleFirstInteraction)
        document.addEventListener('touchstart', handleFirstInteraction)

        return () => {
            document.removeEventListener('click', handleFirstInteraction)
            document.removeEventListener('touchstart', handleFirstInteraction)
        }
    }, [isPlaying])

    return (
        <div className="fixed top-4 right-4 z-50">
            <audio 
                ref={audioRef} 
                src="/audio.mp3" 
                loop 
            />
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMusic}
                className="p-3 rounded-full bg-pink-500/20 backdrop-blur-md border border-pink-500/30 text-pink-300 shadow-lg group relative"
            >
                {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
                
                <AnimatePresence>
                    {!isPlaying && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="absolute right-14 top-1/2 -translate-y-1/2 bg-pink-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full whitespace-nowrap pointer-events-none shadow-lg shadow-pink-500/40"
                        >
                            Play Music! 🎵
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    )
}
