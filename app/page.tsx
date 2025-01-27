"use client"

import { useState, useEffect, useCallback } from "react"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import Celebration from "./components/Celebration"
import Login from "./components/Login"
import Register from "./components/Register"
import { Inter } from "next/font/google"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

const inter = Inter({ subsets: ["latin"] })

interface Task {
  _id: string
  name: string
  duration: number
  timeSpent: number
  completed: boolean
}

function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [showCelebration, setShowCelebration] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const { isAuthenticated, logout, token } = useAuth()

  const fetchTasks = useCallback(async () => {
    if (!isAuthenticated) return

    try {
      const response = await fetch("http://localhost:5001/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setTasks(data)
      }
    } catch (error) {
      console.error("Error fetching tasks:", error)
    }
  }, [isAuthenticated, token])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true"
    setDarkMode(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  useEffect(() => {
    setShowCelebration(tasks.length > 0 && tasks.every((task) => task.completed))
  }, [tasks])

  const addTask = async (name: string, duration: number) => {
    try {
      const response = await fetch("http://localhost:5001/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, duration }),
      })
      if (response.ok) {
        const newTask = await response.json()
        setTasks((prevTasks) => [...prevTasks, newTask])
      }
    } catch (error) {
      console.error("Error adding task:", error)
    }
  }

  const updateTaskTime = async (taskId: string, timeSpent: number) => {
    try {
      const response = await fetch(`http://localhost:5001/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ timeSpent }),
      })
      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, timeSpent, completed: timeSpent >= task.duration } : task,
          ),
        )
      }
    } catch (error) {
      console.error("Error updating task time:", error)
    }
  }

  const toggleTaskComplete = async (taskId: string) => {
    try {
      const taskToUpdate = tasks.find((t) => t._id === taskId)
      if (!taskToUpdate) return

      const response = await fetch(`http://localhost:5001/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: !taskToUpdate.completed }),
      })
      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === taskId ? { ...task, completed: !task.completed } : task)),
        )
      }
    } catch (error) {
      console.error("Error toggling task completion:", error)
    }
  }

  const deleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`http://localhost:5001/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId))
      }
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
    localStorage.setItem("darkMode", (!darkMode).toString())
  }

  const dismissCelebration = () => {
    setShowCelebration(false)
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 p-4 ${inter.className}`}>
      <div className="container mx-auto max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Task Tracker</h1>
          <Button onClick={toggleDarkMode} variant="ghost" size="icon">
            {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </div>
        {isAuthenticated ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <Button onClick={logout} className="mb-4">
              Logout
            </Button>
            <TaskForm onAddTask={addTask} />
            <div className="mt-8 space-y-8">
              <TaskList
                tasks={tasks.filter((task) => !task.completed)}
                onUpdateTaskTime={updateTaskTime}
                onToggleComplete={toggleTaskComplete}
                onDeleteTask={deleteTask}
                title="Tasks to Do"
              />
              <TaskList
                tasks={tasks.filter((task) => task.completed)}
                onUpdateTaskTime={updateTaskTime}
                onToggleComplete={toggleTaskComplete}
                onDeleteTask={deleteTask}
                title="Completed Tasks"
              />
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            {showRegister ? (
              <>
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <Register />
                <p className="mt-4">
                  Already have an account?{" "}
                  <Button variant="link" onClick={() => setShowRegister(false)}>
                    Login
                  </Button>
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <Login />
                <p className="mt-4">
                  Don't have an account?{" "}
                  <Button variant="link" onClick={() => setShowRegister(true)}>
                    Register
                  </Button>
                </p>
              </>
            )}
          </div>
        )}
        {showCelebration && <Celebration onDismiss={dismissCelebration} />}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  )
}

