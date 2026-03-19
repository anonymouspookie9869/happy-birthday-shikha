import { useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-cards"
import { Mail, RotateCcw } from "lucide-react"
import confetti from "canvas-confetti"
import GradientButton from "../GradientButton"

interface PhotoData {
  src: string;
  note: string;
  emoji: string;
}

const photos: PhotoData[] = [
  { src: "https://raw.githubusercontent.com/anonymouspookie9869/happy-birthday-shikha/main/memory_1.jpg", note: "The way you look at me... it's intoxicating. 🧛‍♀️❤️", emoji: "🍷" },
  { src: "https://raw.githubusercontent.com/anonymouspookie9869/happy-birthday-shikha/main/memory_2.jpg", note: "My heart beats only for you, my vampire. 💓", emoji: "🦇" },
  { src: "https://raw.githubusercontent.com/anonymouspookie9869/happy-birthday-shikha/main/memory_3.jpg", note: "Forever isn't long enough with you. ♾️", emoji: "💍" },
  { src: "https://raw.githubusercontent.com/anonymouspookie9869/happy-birthday-shikha/main/memory_4.jpg", note: "You're the magic in my dark world. ✨", emoji: "🌙" },
]

function FlipCard({ photo }: { photo: PhotoData }) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    const nextFlipped = !isFlipped
    setIsFlipped(nextFlipped)
    
    // Play sound
    const flipSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3")
    flipSound.volume = 0.4
    flipSound.play().catch(e => console.log("Audio play failed:", e))

    if (nextFlipped) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ["#FF3CAC", "#F687B3", "#D8B4FE", "#C084FC", "#F472B6", "#FF69B4"],
      })
    }
  }

  return (
    <div 
      className="relative w-full h-full cursor-pointer perspective-1000"
      onClick={handleFlip}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden rounded-2xl bg-white/10 backdrop-blur-sm p-2">
          <img
            src={photo.src}
            alt="Memory"
            className="h-full w-full rounded-xl object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-4 right-4 bg-pink-500/80 text-white p-1.5 rounded-full shadow-lg">
            <RotateCcw size={16} />
          </div>
        </div>

        {/* Back Side */}
        <div 
          className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-pink-100 to-rose-50 p-6 flex flex-col items-center justify-center text-center border-4 border-pink-200 shadow-inner"
          style={{ transform: "rotateY(180deg)" }}
        >
          <span className="text-6xl mb-4">{photo.emoji}</span>
          <p className="text-[#4a1d3a] text-xl font-bold leading-relaxed">
            {photo.note}
          </p>
          <div className="mt-6 text-pink-400/50 italic text-sm">
            (Tap to flip back)
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function PhotosScreen({ onNext }: { onNext: () => void }) {
  const swiperRef = useRef(null)

  return (
    <div className="px-4 md:px-6 py-10">
      <div className="text-center mb-6">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow"
        >
          Sweet Memories, Shikha
        </motion.h2>
        <p className="text-sm text-rose-100/90 mt-1">(Swipe the cards & Tap to flip! ✨)</p>
      </div>

      <div className="relative flex justify-center">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <Swiper
            effect="cards"
            grabCursor
            modules={[EffectCards]}
            onSwiper={(sw) => (swiperRef.current = sw as any)}
            className="w-[280px] h-[420px] md:w-[340px] md:h-[460px]"
          >
            {photos.map((photo, i) => (
              <SwiperSlide key={i}>
                <FlipCard photo={photo} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="mt-8 flex justify-center"
      >
        <GradientButton onClick={onNext}>
          <Mail size={20} className="mt-0.5" /> Read My Message
        </GradientButton>
      </motion.div>
    </div>
  )
}
