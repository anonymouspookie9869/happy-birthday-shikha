import { motion, AnimatePresence } from "motion/react"
import { Heart, Sparkles, RotateCcw } from "lucide-react"
import { useState } from "react"
import confetti from "canvas-confetti"
import GradientButton from "../GradientButton"

export default function ProposalScreen({ onDone }: { onDone: () => void }) {
    const [answer, setAnswer] = useState<string | null>(null)
    const [noCount, setNoCount] = useState(0)
    const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 })
    const [heartRain, setHeartRain] = useState<{ id: number; left: string; delay: number }[]>([])

    const handleNo = () => {
        setNoCount(prev => prev + 1)
        // Play funny sound
        const boingSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3")
        boingSound.volume = 0.3
        boingSound.play().catch(e => console.log("Audio play failed:", e))

        // Move the button to a random position on mobile to make it harder to click
        const randomX = Math.random() * 200 - 100
        const randomY = Math.random() * 200 - 100
        setNoButtonPos({ x: randomX, y: randomY })
    }

    const getNoButtonText = () => {
        const phrases = [
            "No",
            "Are you sure?",
            "Really sure?",
            "Think again!",
            "Last chance!",
            "Surely not?",
            "You might regret this!",
            "Give it another thought!",
            "Are you absolutely sure?",
            "This could be a mistake!",
            "Have a heart!",
            "Don't be so cold!",
            "Change of heart?",
            "Wouldn't you reconsider?",
            "Is that your final answer?",
            "You're breaking my heart ;(",
        ]
        return phrases[Math.min(noCount, phrases.length - 1)]
    }

    const handleYes = () => {
        setAnswer('yes')
        // Play celebration sound
        const tadaSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3")
        tadaSound.volume = 0.5
        tadaSound.play().catch(e => console.log("Audio play failed:", e))

        // Create heart rain
        const newHearts = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            delay: Math.random() * 2
        }))
        setHeartRain(newHearts)
        
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
            colors: ["#FF3CAC", "#F687B3", "#D8B4FE", "#C084FC", "#F472B6", "#FF69B4"],
        })

        // Send Discord notification
        const webhookUrl = process.env.VITE_DISCORD_WEBHOOK_URL
        if (webhookUrl) {
            fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: "🧛‍♀️❤️ **SHIKHA SAID YES!** ❤️🧛‍♂️\n\nShe has agreed to be the forever vampire for her Lucifer! 💍✨",
                    embeds: [{
                        title: "Celebration Time!",
                        description: "The proposal was successful! 🥂",
                        color: 0xFF3CAC,
                        timestamp: new Date().toISOString()
                    }]
                })
            }).catch(err => console.error("Failed to send Discord notification:", err))
        }
    }

    if (answer === 'yes') {
        return (
            <div className="flex flex-col items-center justify-center text-center p-6 space-y-8 min-h-[80vh]">
                {/* Heart Rain */}
                {heartRain.map(h => (
                    <div
                        key={h.id}
                        className="heart-rain text-rose-500"
                        style={{
                            left: h.left,
                            animationDelay: `${h.delay}s`,
                            animationDuration: `${2 + Math.random() * 2}s`,
                            fontSize: `${15 + Math.random() * 20}px`
                        }}
                    >
                        ❤️
                    </div>
                ))}
                
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="relative"
                >
                    <img
                        src="https://raw.githubusercontent.com/anonymouspookie9869/happy-birthday-shikha/main/proposal_sucess.jpg"
                        alt="Celebration"
                        className="w-64 h-64 rounded-full object-cover border-8 border-pink-400 shadow-[0_0_50px_rgba(244,114,182,0.6)]"
                        referrerPolicy="no-referrer"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-4 -right-4 bg-rose-500 text-white p-3 rounded-full shadow-lg"
                    >
                        <Heart fill="currentColor" size={32} />
                    </motion.div>
                </motion.div>
                
                <div className="space-y-4">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-5xl md:text-7xl font-romantic italic text-white leading-tight drop-shadow-lg">
                        I knew you'd say yes! ❤️
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-rose-200 text-xl md:text-2xl font-serif italic max-w-md mx-auto">
                        You've made this Lucifer the happiest in the universe, my Vampire. Forever yours. 🧛‍♂️💍
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="pt-8"
                >
                    <GradientButton onClick={onDone}>
                        <Sparkles size={20} />
                        Our Forever Starts Now
                    </GradientButton>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center text-center p-4 space-y-12 min-h-[80vh]">
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
            >
                <div className="relative z-10">
                    <img
                        src="https://raw.githubusercontent.com/anonymouspookie9869/happy-birthday-shikha/main/proposal_question.jpg"
                        alt="Proposal"
                        className="w-48 h-48 md:w-64 md:h-64 rounded-2xl object-cover border-4 border-pink-300 shadow-2xl"
                        referrerPolicy="no-referrer"
                    />
                </div>
                <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 bg-rose-500/30 blur-3xl -z-10 rounded-full" 
                />
            </motion.div>

            <div className="space-y-6">
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-500/10 text-rose-300 text-[10px] font-bold uppercase tracking-[0.4em] border border-rose-500/20 shadow-sm"
                >
                    <Sparkles size={12} /> The Final Question
                </motion.div>
                <h2 className="text-4xl md:text-7xl font-romantic italic text-white leading-tight drop-shadow-md px-2">
                    Shikha, will you be forever vampire for this lucifer? 🧛‍♂️💍
                </h2>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-md mx-auto">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleYes}
                    style={{ fontSize: `${16 + noCount * 5}px` }}
                    className="w-full md:w-auto px-12 py-4 bg-green-500 text-white rounded-full font-bold shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:bg-green-600 transition-all z-50 active:scale-95"
                >
                    Yes
                </motion.button>
                
                <motion.button
                    animate={{ 
                        x: noButtonPos.x, 
                        y: noButtonPos.y,
                        rotate: [0, -5, 5, -5, 5, 0]
                    }}
                    transition={{
                        rotate: { repeat: Infinity, duration: 0.5, ease: "linear" },
                        type: "spring",
                        stiffness: 300,
                        damping: 15
                    }}
                    whileHover={{ 
                        scale: 1.2,
                        x: noButtonPos.x + (Math.random() * 40 - 20),
                        y: noButtonPos.y + (Math.random() * 40 - 20)
                    }}
                    onClick={handleNo}
                    className="w-full md:w-auto px-8 py-4 bg-rose-500/20 border border-rose-500/40 text-white rounded-full font-bold hover:bg-rose-500/40 transition-all text-sm whitespace-nowrap active:scale-95 shadow-lg"
                >
                    {getNoButtonText()}
                </motion.button>
            </div>

            {noCount > 0 && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-pink-300/60 italic text-xs"
                >
                    (The "Yes" button is growing... just like my love! 😉)
                </motion.p>
            )}
        </div>
    )
}
