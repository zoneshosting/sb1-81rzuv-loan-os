import React from 'react';
import { DollarSign, Users, Clock, CheckCircle } from 'lucide-react';

const StatsCard = ({ icon: Icon, label, value, trend }: any) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        <p className={`text-sm mt-2 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% vs last month
        </p>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg">
        <Icon className="w-6 h-6 text-blue-500" />
      </div>
    </div>
  </div>
);

const DashboardStats = () => {
  const stats = [
    { icon: DollarSign, label: 'Active Loans', value: '$12.4M', trend: 8.2 },
    { icon: Users, label: 'Active Clients', value: '284', trend: 12.5 },
    { icon: Clock, label: 'Pending Approval', value: '24', trend: -3.8 },
    { icon: CheckCircle, label: 'Closed This Month', value: '38', trend: 15.3 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatsCard key={stat.label} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;