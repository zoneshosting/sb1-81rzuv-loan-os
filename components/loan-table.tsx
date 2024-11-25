import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function LoanTable() {
  const loans = [
    {
      id: "L-2024-001",
      client: "Robert Chen",
      type: "Conventional",
      amount: "$425,000",
      status: "In Processing",
      progress: 65,
    },
    {
      id: "L-2024-002",
      client: "Sarah Miller",
      type: "FHA",
      amount: "$285,000",
      status: "Underwriting",
      progress: 80,
    },
    {
      id: "L-2024-003",
      client: "James Wilson",
      type: "VA",
      amount: "$520,000",
      status: "Pending Documents",
      progress: 45,
    },
    {
      id: "L-2024-004",
      client: "Emily Davis",
      type: "Jumbo",
      amount: "$850,000",
      status: "Approved",
      progress: 90,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Loan Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-3">Loan ID</th>
                <th className="px-6 py-3">Client</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loans.map((loan) => (
                <tr key={loan.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium text-primary">
                    {loan.id}
                  </td>
                  <td className="px-6 py-4">{loan.client}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {loan.type}
                  </td>
                  <td className="px-6 py-4 font-medium">{loan.amount}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                      {loan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${loan.progress}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}