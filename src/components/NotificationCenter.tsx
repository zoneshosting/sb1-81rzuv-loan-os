import React from 'react';
import { Bell, MessageSquare, FileText, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const NotificationCenter = () => {
  const notifications = [
    {
      id: 1,
      type: 'message',
      icon: MessageSquare,
      content: 'New message from Sarah Miller regarding loan application',
      time: '5 minutes ago',
    },
    {
      id: 2,
      type: 'document',
      icon: FileText,
      content: 'James Wilson uploaded new documents for review',
      time: '1 hour ago',
    },
    {
      id: 3,
      type: 'alert',
      icon: AlertCircle,
      content: 'Loan application deadline approaching for Johnson case',
      time: '2 hours ago',
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Recent Notifications</CardTitle>
        <Bell className="w-5 h-5 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 bg-blue-50 rounded-full">
                <notification.icon className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{notification.content}</p>
                <span className="text-xs text-gray-500">{notification.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;