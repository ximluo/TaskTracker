import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, Trash2 } from "lucide-react"

interface Task {
  _id: string
  name: string
  duration: number
  timeSpent: number
  completed: boolean
}

interface TaskItemProps {
  task: Task
  onUpdateTaskTime: (_id: string, timeSpent: number) => void
  onToggleComplete: (_id: string) => void
  onDeleteTask: (_id: string) => void
}

export default function TaskItem({ task, onUpdateTaskTime, onToggleComplete, onDeleteTask }: TaskItemProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [timeSpent, setTimeSpent] = useState(task.timeSpent)

  const updateTime = useCallback(() => {
    const newTime = timeSpent + 1 / 60
    setTimeSpent(newTime)
    onUpdateTaskTime(task._id, newTime)
  }, [timeSpent, task._id, onUpdateTaskTime])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && timeSpent < task.duration) {
      interval = setInterval(updateTime, 1000) // Update every second
    }
    return () => clearInterval(interval)
  }, [isRunning, timeSpent, task.duration, updateTime])

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const handleCircleClick = () => {
    onToggleComplete(task._id)
  }

  const progress = (timeSpent / task.duration) * 100

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-all duration-300 ease-in-out transform hover:scale-102 ${
        task.completed ? "opacity-70" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <div
            onClick={handleCircleClick}
            className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-colors duration-300 ease-in-out ${
              task.completed
                ? "bg-green-500 border-green-500"
                : "border-gray-300 dark:border-gray-500 hover:border-indigo-500"
            }`}
          >
            {task.completed && (
              <svg
                className="w-4 h-4 mx-auto mt-0.5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            )}
          </div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">{task.name}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={toggleTimer}
            disabled={task.completed}
            variant="ghost"
            size="sm"
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 hover:bg-indigo-100 dark:hover:bg-indigo-900"
          >
            {isRunning ? <Pause size={20} /> : <Play size={20} />}
          </Button>
          <Button
            onClick={() => onDeleteTask(task._id)}
            variant="ghost"
            size="sm"
            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 hover:bg-red-100 dark:hover:bg-red-900"
          >
            <Trash2 size={20} />
          </Button>
        </div>
      </div>
      <Progress value={progress} className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 dark:bg-indigo-400 transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </Progress>
      <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
        <span>
          {Math.floor(timeSpent)} / {task.duration} minutes
        </span>
        <span>{progress.toFixed(1)}% Complete</span>
      </div>
    </div>
  )
}