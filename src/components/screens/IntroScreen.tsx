import GradientButton from "../GradientButton"
import { Gift, Heart, Sparkles } from "lucide-react"
import { motion } from "motion/react"
import LoveMeter from "../LoveMeter"

export default function IntroScreen({ onNext }: { onNext: () => void }) {
    return (
        <div className="py-10 md:py-14 text-center">
            <div className="flex flex-col items-center gap-6">
                <div className="relative">
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        <img
                            src="https://raw.githubusercontent.com/anonymouspookie9869/happy-birthday-shikha/main/into_topper.jpg"
                            alt="Cute birthday animation topper"
                            className="w-[160px] md:w-[200px] rounded-full object-cover shadow-[0_0_40px_rgba(244,114,182,0.5)] border-4 border-pink-400"
                            referrerPolicy="no-referrer"
                        />
                    </motion.div>
                    <motion.div
                        className="absolute -top-4 -right-4 text-pink-400"
                        animate={{ scale: [1, 1.2, 1], y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Heart fill="currentColor" size={40} />
                    </motion.div>
                </div>

                <div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-pretty text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-fuchsia-400 to-rose-400 drop-shadow leading-tight"
                        style={{
                            filter: "drop-shadow(0 0 20px rgba(255,105,180,0.6))",
                        }}>
                        Happy Birthday, My Vampire! 🧛‍♀️❤️
                    </motion.h1>
                    <p className="mt-6 text-2xl text-pink-200 font-medium italic">To the girl who stole my heart and never let go... Shikha. 🌸</p>
                </div>

                <div className="mt-8">
                    <GradientButton
                        onClick={() => { onNext?.() }}
                    >
                        <Sparkles size={20} />
                        Enter Our World, My Love
                    </GradientButton>
                </div>

                <LoveMeter />
            </div>
        </div>
    )
}
