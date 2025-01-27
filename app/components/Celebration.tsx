import { useEffect } from "react"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/button"

interface CelebrationProps {
  onDismiss: () => void
}

export default function Celebration({ onDismiss }: CelebrationProps) {
  useEffect(() => {
    const duration = 5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        }),
      )
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        }),
      )
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg text-center shadow-xl transform transition-all duration-300 ease-in-out scale-100">
        <h2 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Congratulations!</h2>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">You've completed all your tasks for today!</p>
        <Button
          onClick={onDismiss}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
        >
          Dismiss
        </Button>
      </div>
    </div>
  )
}

