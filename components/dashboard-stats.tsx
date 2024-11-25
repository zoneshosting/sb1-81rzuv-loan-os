import { DollarSign, Users, Clock, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardStats() {
  const stats = [
    {
      title: "Active Loans",
      value: "$12.4M",
      icon: DollarSign,
      trend: 8.2,
    },
    {
      title: "Active Clients",
      value: "284",
      icon: Users,
      trend: 12.5,
    },
    {
      title: "Pending Approval",
      value: "24",
      icon: Clock,
      trend: -3.8,
    },
    {
      title: "Closed This Month",
      value: "38",
      icon: CheckCircle,
      trend: 15.3,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs ${stat.trend >= 0 ? "text-green-500" : "text-red-500"}`}>
              {stat.trend >= 0 ? "+" : ""}{stat.trend}% from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}