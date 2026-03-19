import { motion } from "motion/react"

export default function GradientButton({ className = "", children, ...props }: any) {
    return (
        <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            {...props}
            className={[
                "px-10 py-4 rounded-full text-white font-semibold text-lg cursor-pointer",
                "bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500",
                "shadow-[0_0_28px_rgba(244,114,182,0.35)]",
                "transition-transform duration-200 ease-out flex items-center justify-center gap-2",
                className,
            ].join(" ")}
        >
            {children}
        </motion.button>
    )
}
