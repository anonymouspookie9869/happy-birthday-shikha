import { motion } from "motion/react"
import { Heart, Sparkles, X } from "lucide-react"
import InteractiveMemoryJar from "../InteractiveMemoryJar"
import { useState } from "react"

export default function MessageScreen({ onNext, onClose }: { onNext: () => void, onClose: () => void }) {
    const [showInteractive, setShowInteractive] = useState(false)

    if (showInteractive) {
        return <InteractiveMemoryJar onNext={onNext} />
    }

    return (
        <div className="px-4 md:px-6 py-10 text-center relative">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block mb-4"
            >
                <div className="flex items-center gap-2 text-pink-400">
                    <Sparkles size={24} />
                    <Heart fill="currentColor" size={32} />
                    <Sparkles size={24} />
                </div>
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-400 to-fuchsia-400 drop-shadow mb-8 leading-tight"
            >
                To My Vampire, Shikha 🧛‍♀️💖
            </motion.h2>

            <div className="mx-auto relative w-full max-w-3xl flex flex-col items-center gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="h-auto max-w-xl bg-gradient-to-br from-pink-100 via-rose-50 to-white rounded-3xl shadow-[0_20px_50px_rgba(244,114,182,0.4)] p-8 md:p-12 text-center border-8 border-pink-200/50 relative overflow-hidden"
                >
                    {/* Close Button */}
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-pink-400 hover:text-pink-600 transition-colors z-20"
                    >
                        <X size={24} />
                    </button>

                    {/* Decorative elements inside card */}
                    <div className="absolute -top-4 -left-4 text-pink-200/40 rotate-12">
                        <Heart fill="currentColor" size={80} />
                    </div>
                    <div className="absolute -bottom-4 -right-4 text-pink-200/40 -rotate-12">
                        <Heart fill="currentColor" size={80} />
                    </div>

                    <p className="text-[#4a1d3a] text-lg md:text-xl leading-relaxed font-semibold relative z-10">
                        Happy Birthday, My Vampire! 🌸 
                        <br /><br />
                        They say vampires live forever, and that's exactly how long I want to love you. You've bitten my heart and filled it with a love that's deeper than anything I've ever known. 
                        <br /><br />
                        You're not just my girl; you're my soulmate, my best friend, and my favorite mystery. Your smile is the only light I need, and your presence is the only magic I believe in. 
                        <br /><br />
                        I hope your day is as enchanting and breathtaking as you are. May every moment be filled with the same joy you bring into my life every single day. 
                        <br /><br />
                        I love you more than words can ever say, Shikha. Forever and always. ✨
                    </p>
                    
                    <motion.div 
                        className="mt-10 text-pink-600 font-bold text-2xl relative z-10"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        Yours Forever ❤️
                    </motion.div>
                </motion.div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowInteractive(true)}
                    className="px-10 py-4 bg-pink-500 text-white rounded-full font-bold shadow-xl hover:bg-pink-600 transition-all uppercase tracking-widest text-xs"
                >
                    Reveal More Memories
                </motion.button>

                <button 
                    onClick={onClose}
                    className="text-pink-400 hover:text-pink-600 font-medium text-sm underline underline-offset-4 cursor-pointer"
                >
                    Close My Heart
                </button>
            </div>
        </div>
    )
}
