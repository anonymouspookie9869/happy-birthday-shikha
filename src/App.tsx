/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "motion/react"
import LoaderScreen from "./components/screens/LoaderScreen"
import IntroScreen from "./components/screens/IntroScreen"
import CakeScreen from "./components/screens/CakeScreen"
import PhotosScreen from "./components/screens/PhotosScreen"
import MessageScreen from "./components/screens/MessageScreen"
import ProposalScreen from "./components/screens/ProposalScreen"
import MusicPlayer from "./components/MusicPlayer"

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [hearts, setHearts] = useState<{ id: number; left: string; duration: number; size: number }[]>([])

  useEffect(() => {
    // Generate floating hearts
    const interval = setInterval(() => {
      setHearts(prev => [
        ...prev.slice(-15), // Keep only last 15
        {
          id: Date.now(),
          left: `${Math.random() * 100}%`,
          duration: 4 + Math.random() * 4,
          size: 10 + Math.random() * 20
        }
      ])
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const renderScreen = () => {
    switch (currentScreen) {
      case 0:
        return <LoaderScreen onDone={() => setCurrentScreen(1)} />;
      case 1:
        return <IntroScreen onNext={() => setCurrentScreen(2)} />;
      case 2:
        return <CakeScreen onNext={() => setCurrentScreen(3)} />;
      case 3:
        return <PhotosScreen onNext={() => setCurrentScreen(4)} />;
      case 4:
        return <MessageScreen onNext={() => setCurrentScreen(5)} onClose={() => setCurrentScreen(1)} />;
      case 5:
        return <ProposalScreen onDone={() => setCurrentScreen(1)} />;
      default:
        return null;
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-tr from-[#1a0b14] via-[#0a0508] to-[#1a0b14] overflow-hidden relative selection:bg-pink-500/30">
      {/* Cinematic Vignette */}
      <div className="vignette" />
      
      {/* Floating Hearts Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="floating-heart text-pink-500/20"
            style={{
              left: heart.left,
              animationDuration: `${heart.duration}s`,
              fontSize: `${heart.size}px`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <MusicPlayer />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            transition={{ duration: 0.8 }}
            className={`w-full ${currentScreen === 3 ? "max-w-7xl" : "max-w-3xl md:max-w-4xl"}`}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Watermark */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1,
          delay: 1,
        }}
        className="fixed bottom-4 right-4 text-sm text-pink-300/40 pointer-events-none z-50 font-light">
        For Shikha ✨
      </motion.div>
    </main>
  )
}
