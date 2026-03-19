import { motion } from "motion/react"
import { useEffect, useState } from "react"
import HeartCanvas from "../HeartCanvas"

export default function LoaderScreen({ onDone }: { onDone: () => void }) {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setTimeout(onDone, 800)
                    return 100
                }
                return prev + 1
            })
        }, 30)
        return () => clearInterval(interval)
    }, [onDone])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
            <HeartCanvas />
            
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative z-10 flex flex-col items-center"
            >
                <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-pink-400 mb-8 text-center"
                >
                    <div className="text-sm uppercase tracking-[0.5em] font-bold text-pink-300/60 mb-2">Syncing Heartbeats</div>
                    <div className="text-xs font-light tracking-[0.3em] text-pink-400/40">Preparing a cinematic surprise...</div>
                </motion.div>

                {progress < 100 ? (
                    <>
                        <div className="w-64 h-1 bg-pink-900/30 rounded-full overflow-hidden border border-pink-500/20">
                            <motion.div
                                className="h-full bg-gradient-to-r from-pink-500 via-rose-400 to-fuchsia-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                            />
                        </div>
                        
                        <div className="mt-4 text-pink-300 font-mono text-xs tracking-widest">
                            {progress}% LOADED
                        </div>
                    </>
                ) : (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onDone}
                        className="px-8 py-3 bg-pink-500 text-white rounded-full font-bold shadow-[0_0_20px_rgba(244,114,182,0.5)] hover:bg-pink-600 transition-all uppercase tracking-widest text-sm"
                    >
                        Open Your Heart
                    </motion.button>
                )}
            </motion.div>
        </div>
    )
}
