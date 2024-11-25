import { DashboardStats } from "@/components/dashboard-stats"
import { LoanTable } from "@/components/loan-table"
import { TaskList } from "@/components/task-list"

export default function Home() {
  return (
    <div className="container py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="mt-2 text-muted-foreground">
          Welcome back! Here's what's happening today.
        </p>
      </header>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <LoanTable />
        </div>
        <div>
          <TaskList />
        </div>
      </div>
    </div>
  )
}