import { CheckCircle, Clock, AlertCircle } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function TaskList() {
  const tasks = [
    {
      id: 1,
      title: "Review Johnson Application",
      priority: "high",
      due: "2024-03-20",
      type: "Document Review",
    },
    {
      id: 2,
      title: "Update Miller Credit Report",
      priority: "medium",
      due: "2024-03-21",
      type: "Credit Check",
    },
    {
      id: 3,
      title: "Schedule Thompson Appraisal",
      priority: "low",
      due: "2024-03-22",
      type: "Appraisal",
    },
  ]

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-4 w-4 text-destructive" />
      case "medium":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 rounded-lg bg-muted"
            >
              <div className="flex items-center space-x-4">
                {getPriorityIcon(task.priority)}
                <div>
                  <h3 className="text-sm font-medium">{task.title}</h3>
                  <p className="text-sm text-muted-foreground">{task.type}</p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">Due {task.due}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}