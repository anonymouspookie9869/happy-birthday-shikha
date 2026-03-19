import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Heart, Sparkles } from "lucide-react"

export default function LoveMeter() {
    const [level, setLevel] = useState(0)
    const [isMax, setIsMax] = useState(false)

    const fillMeter = () => {
        if (level < 100) {
            setLevel(prev => Math.min(prev + 10, 100))
            if (level + 10 >= 100) {
                setIsMax(true)
            }
        }
    }

    return (
        <div className="mt-10 flex flex-col items-center gap-4">
            <h3 className="text-pink-300 text-xl font-bold flex items-center gap-2">
                <Heart size={20} fill={isMax ? "currentColor" : "none"} />
                How much I love my Vampire?
                <Heart size={20} fill={isMax ? "currentColor" : "none"} />
            </h3>
            
            <div className="w-64 h-6 bg-pink-900/30 rounded-full border border-pink-500/30 overflow-hidden relative cursor-pointer" onClick={fillMeter}>
                <motion.div 
                    className="h-full bg-gradient-to-r from-pink-500 to-rose-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${level}%` }}
                    transition={{ type: "spring", stiffness: 100 }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white drop-shadow-md">
                    {level}%
                </div>
            </div>

            <AnimatePresence>
                {isMax && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="text-pink-400 font-bold text-lg flex items-center gap-2"
                    >
                        <Sparkles size={16} />
                        Error: Love overflow! Infinity & Beyond!
                        <Sparkles size={16} />
                    </motion.div>
                )}
            </AnimatePresence>

            {!isMax && (
                <p className="text-pink-300/60 text-xs italic">(Tap the bar to fill it with love!)</p>
            )}
        </div>
    )
}
