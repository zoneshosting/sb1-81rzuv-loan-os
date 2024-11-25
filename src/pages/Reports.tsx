import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { BarChart2, PieChart, TrendingUp, Download } from 'lucide-react';

const Reports = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <Button className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Reports
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Loan Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              <BarChart2 className="w-16 h-16 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Loan Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              <PieChart className="w-16 h-16 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Processing Time Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              <TrendingUp className="w-16 h-16 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground">
                Total Loans
              </h3>
              <p className="text-2xl font-bold mt-2">246</p>
              <p className="text-sm text-green-500 mt-1">↑ 12% vs last month</p>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground">
                Approval Rate
              </h3>
              <p className="text-2xl font-bold mt-2">85%</p>
              <p className="text-sm text-green-500 mt-1">↑ 5% vs last month</p>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground">
                Avg Processing Time
              </h3>
              <p className="text-2xl font-bold mt-2">18 days</p>
              <p className="text-sm text-red-500 mt-1">↓ 2 days vs last month</p>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground">
                Revenue
              </h3>
              <p className="text-2xl font-bold mt-2">$1.2M</p>
              <p className="text-sm text-green-500 mt-1">↑ 15% vs last month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Report Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Generated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-muted/50">
                <td className="px-6 py-4 text-sm font-medium">
                  Monthly Performance Report
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  March 15, 2024
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  Performance
                </td>
                <td className="px-6 py-4">
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;