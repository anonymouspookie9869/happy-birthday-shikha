import { motion, AnimatePresence } from "motion/react"
import { Heart, Sparkles, MessageCircleHeart } from "lucide-react"
import { useState } from "react"
import GradientButton from "./GradientButton"

const MEMORIES = [
    { text: "That first time our eyes met...", emoji: "👀" },
    { text: "The way you smile when you're shy.", emoji: "😊" },
    { text: "Our late night conversations.", emoji: "🌙" },
    { text: "How you make everything better just by being there.", emoji: "✨" },
    { text: "The way you call my name.", emoji: "🗣️" },
    { text: "Your laugh that sounds like music.", emoji: "🎶" },
    { text: "Everything about you is perfect to me.", emoji: "💖" },
    { text: "The way you look at me... it's intoxicating.", emoji: "🧛‍♀️" },
    { text: "My heart beats only for you, my vampire.", emoji: "🦇" }
]

export default function InteractiveMemoryJar({ onNext }: { onNext: () => void }) {
    const [revealed, setRevealed] = useState<number[]>([])
    const [activeMemory, setActiveMemory] = useState<{ text: string, emoji: string } | null>(null)

    const handleTap = (index: number) => {
        // Play subtle UI click sound
        const clickSound = new Audio("https://raw.githubusercontent.com/anonymouspookie9869/happy-birthday-shikha/main/memory_reveal.mp3")
        clickSound.volume = 0.2
        clickSound.play().catch(e => console.log("Audio play failed:", e))

        if (!revealed.includes(index)) {
            const newRevealed = [...revealed, index]
            setRevealed(newRevealed)
            
            // Play a gentle success sound if all revealed
            if (newRevealed.length === MEMORIES.length) {
                const successSound = new Audio("https://raw.githubusercontent.com/anonymouspookie9869/happy-birthday-shikha/main/all_revealed_sparkle.mp3")
                successSound.volume = 0.2
                setTimeout(() => successSound.play().catch(e => console.log("Audio play failed:", e)), 600)
            }
        }
        setActiveMemory(MEMORIES[index])
    }

    return (
        <div className="flex flex-col items-center justify-center text-center p-4 space-y-8 min-h-[80vh]">
            <div className="space-y-4">
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pink-500/10 text-pink-300 text-[10px] font-bold uppercase tracking-[0.4em] border border-pink-500/20 shadow-sm"
                >
                    <MessageCircleHeart size={12} /> Interactive Memories
                </motion.div>
                <h2 className="text-3xl md:text-5xl font-romantic italic text-white leading-tight drop-shadow-md">Tap the hearts to reveal my thoughts</h2>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-md mx-auto py-4">
                {MEMORIES.map((m, i) => (
                    <motion.button
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleTap(i)}
                        className={`relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-2xl border transition-all duration-500 ${
                            revealed.includes(i) 
                            ? 'bg-pink-500/20 border-pink-500/50 shadow-[0_0_20px_rgba(244,114,182,0.3)]' 
                            : 'bg-white/5 border-white/10 hover:border-pink-500/30'
                        }`}
                    >
                        <Heart 
                            size={revealed.includes(i) ? 32 : 24} 
                            fill={revealed.includes(i) ? "#ec4899" : "transparent"}
                            className={revealed.includes(i) ? "text-pink-500" : "text-white/20"}
                        />
                        {revealed.includes(i) && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1"
                            >
                                <Sparkles size={16} className="text-yellow-400" />
                            </motion.div>
                        )}
                    </motion.button>
                ))}
            </div>

            <div className="h-32 flex items-center justify-center px-4">
                <AnimatePresence mode="wait">
                    {activeMemory && (
                        <motion.div
                            key={activeMemory.text}
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.9 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <span className="text-4xl">{activeMemory.emoji}</span>
                            <p className="text-pink-200 text-xl md:text-2xl font-serif italic max-w-lg leading-relaxed">
                                "{activeMemory.text}"
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {revealed.length === MEMORIES.length && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-4"
                >
                    <GradientButton onClick={onNext}>
                        <Sparkles size={20} />
                        One Last thing...
                    </GradientButton>
                </motion.div>
            )}
        </div>
    )
}
