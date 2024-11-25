import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { CheckCircle2, AlertTriangle, Clock, FileCheck } from 'lucide-react';

const UnderwritingDashboard = () => {
  const applications = [
    {
      id: 'UW-2024-001',
      borrower: 'Robert Chen',
      status: 'In Review',
      conditions: 3,
      lastUpdated: '2024-03-15',
      priority: 'high',
    },
    {
      id: 'UW-2024-002',
      borrower: 'Sarah Miller',
      status: 'Conditionally Approved',
      conditions: 1,
      lastUpdated: '2024-03-14',
      priority: 'medium',
    },
    {
      id: 'UW-2024-003',
      borrower: 'James Wilson',
      status: 'Pending Documents',
      conditions: 5,
      lastUpdated: '2024-03-13',
      priority: 'low',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Review':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'Conditionally Approved':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'Pending Documents':
        return <FileCheck className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Pending Review</CardTitle>
            <Clock className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">12</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Approved Today</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">8</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Conditions to Review</CardTitle>
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">15</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            {applications.map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between py-4 hover:bg-muted/50 px-4 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  {getStatusIcon(app.status)}
                  <div>
                    <p className="font-medium text-base">{app.borrower}</p>
                    <p className="text-sm text-muted-foreground">
                      {app.id} • Last updated {app.lastUpdated}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                    {app.conditions} conditions
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      app.status === 'Conditionally Approved'
                        ? 'bg-green-100 text-green-800'
                        : app.status === 'In Review'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnderwritingDashboard;