import TaskItem from "./TaskItem"

interface Task {
  _id: string
  name: string
  duration: number
  timeSpent: number
  completed: boolean
}

interface TaskListProps {
  tasks: Task[]
  onUpdateTaskTime: (_id: string, timeSpent: number) => void
  onToggleComplete: (_id: string) => void
  onDeleteTask: (_id: string) => void
  title: string
}

export default function TaskList({ tasks, onUpdateTaskTime, onToggleComplete, onDeleteTask, title }: TaskListProps) {
  if (tasks.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">{title}</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onUpdateTaskTime={onUpdateTaskTime}
            onToggleComplete={onToggleComplete}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    </div>
  )
}