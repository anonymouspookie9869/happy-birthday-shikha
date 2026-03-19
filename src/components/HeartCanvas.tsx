import { useEffect, useRef } from "react"

export default function HeartCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    const particles: Particle[] = []
    const particleCount = 150

    class Particle {
      x: number = 0
      y: number = 0
      size: number = 0
      speedX: number = 0
      speedY: number = 0
      color: string = ""
      life: number = 0
      maxLife: number = 0

      constructor() {
        this.reset()
      }

      reset() {
        this.x = canvas.width / 2
        this.y = canvas.height / 2
        this.size = Math.random() * 3 + 1
        const angle = Math.random() * Math.PI * 2
        const force = Math.random() * 2 + 0.5
        this.speedX = Math.cos(angle) * force
        this.speedY = Math.sin(angle) * force
        this.color = `rgba(244, 114, 182, ${Math.random() * 0.5 + 0.2})`
        this.life = 0
        this.maxLife = Math.random() * 100 + 50
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.life++
        if (this.life >= this.maxLife) {
          this.reset()
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resize)
    resize()

    const drawHeartShape = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath()
      ctx.moveTo(x, y + size * 0.3)
      ctx.bezierCurveTo(x - size * 0.5, y - size * 0.5, x - size * 1.5, y + size * 0.2, x, y + size * 1.2)
      ctx.bezierCurveTo(x + size * 1.5, y + size * 0.2, x + size * 0.5, y - size * 0.5, x, y + size * 0.3)
      ctx.fill()
    }

    const animate = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const baseSize = Math.min(canvas.width, canvas.height) * 0.12
      const pulse = Math.sin(t * 0.004) * 15
      const size = baseSize + pulse

      // Background glow
      const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, size * 3)
      bgGradient.addColorStop(0, "rgba(244, 114, 182, 0.15)")
      bgGradient.addColorStop(1, "rgba(244, 114, 182, 0)")
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Heart glow
      ctx.save()
      ctx.shadowBlur = 40
      ctx.shadowColor = "rgba(244, 114, 182, 0.8)"
      ctx.fillStyle = "rgba(244, 114, 182, 0.9)"
      drawHeartShape(ctx, centerX, centerY, size)
      ctx.restore()

      // Inner heart
      ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
      drawHeartShape(ctx, centerX, centerY, size * 0.8)

      // Particles
      particles.forEach(p => {
        p.update()
        p.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}
