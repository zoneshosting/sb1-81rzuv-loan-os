import React from 'react';
import DashboardStats from './DashboardStats';
import LoanTable from './LoanTable';
import TaskList from './TaskList';
import NotificationCenter from './NotificationCenter';
import LoanCalculator from './LoanCalculator';
import UnderwritingDashboard from './UnderwritingDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const DashboardContent = () => {
  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Lending Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's your overview.</p>
      </header>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="applications">Loan Applications</TabsTrigger>
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="underwriting">Underwriting</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <DashboardStats />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <LoanTable />
              <NotificationCenter />
            </div>
            <div>
              <TaskList />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="applications">
          <LoanTable fullWidth />
        </TabsContent>

        <TabsContent value="calculator">
          <LoanCalculator />
        </TabsContent>

        <TabsContent value="underwriting">
          <UnderwritingDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardContent;