import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import confetti from "canvas-confetti"
import GradientButton from "../GradientButton"
import { ArrowRight, Flame, Heart, Sparkles } from "lucide-react"

const confettiColors = ["#FF3CAC", "#F687B3", "#D8B4FE", "#C084FC", "#F472B6", "#FF69B4"];

export default function CakeScreen({ onNext }: { onNext: () => void }) {
  const [lit, setLit] = useState(false)

  const lightCandle = () => {
    if (lit) return
    setLit(true)
    setTimeout(() => burst(), 500);
    setTimeout(() => burst(), 1000);
    setTimeout(() => burst(), 1500);
  }

  const burst = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: confettiColors,
      shapes: ['circle', 'square'],
      scalar: 1.2
    })
  }

  return (
    <div className="px-4 md:px-6 py-10 text-center relative">
      <AnimatePresence>
        {lit && (
          <motion.div className="fixed top-20 left-0 w-full text-center z-20"
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.5 }}
          >
            <h2 className="text-[45px] md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-400 to-fuchsia-400 drop-shadow-lg px-4"
                style={{ filter: "drop-shadow(0 0 30px rgba(255,105,180,0.8))" }}>
              Make a wish, My Vampire! 🎂❤️
            </h2>
            <div className="flex justify-center gap-4 mt-4">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
                    <Sparkles className="text-pink-300" size={32} />
                </motion.div>
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <Heart className="text-rose-500" fill="currentColor" size={32} />
                </motion.div>
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
                    <Sparkles className="text-pink-300" size={32} />
                </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative flex flex-col items-center gap-8 mt-24">
        <div className="relative mb-6">
          <Cake lit={lit} />
        </div>
        <AnimatePresence mode="wait">
          {!lit ? (
            <motion.div
              key="light"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.5 } }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <GradientButton onClick={lightCandle}>
                <Flame size={20} />
                Light the Candle, Shikha!
              </GradientButton>
            </motion.div>
          ) : (
            <motion.div
              key="next"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 3 } }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <GradientButton onClick={onNext}>
                Next Surprise
                <ArrowRight size={20} className="mt-0.5" />
              </GradientButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div >
  )
}

function Cake({ lit }: { lit: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div className="cake">
        <div className="plate"></div>
        <div className="layer layer-bottom"></div>
        <div className="layer layer-middle"></div>
        <div className="layer layer-top"></div>
        <div className="icing"></div>
        <div className="drip drip1"></div>
        <div className="drip drip2"></div>
        <div className="drip drip3"></div>
        <div className="candle">
          {lit && <motion.div
            initial={{ opacity: 0, scaleY: 0.2, y: 10 }}
            animate={{ opacity: 1, scaleY: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.25, 0.1, 0.25, 1.0],
            }}
            className="flame"></motion.div>}
        </div>
      </div>
    </div>
  )
}
