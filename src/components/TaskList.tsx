import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const TaskList = () => {
  const tasks = [
    {
      id: 1,
      title: 'Review Johnson Application',
      priority: 'high',
      due: '2024-03-20',
      type: 'Document Review',
    },
    {
      id: 2,
      title: 'Update Miller Credit Report',
      priority: 'medium',
      due: '2024-03-21',
      type: 'Credit Check',
    },
    {
      id: 3,
      title: 'Schedule Thompson Appraisal',
      priority: 'low',
      due: '2024-03-22',
      type: 'Appraisal',
    },
  ];

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'medium':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold">Upcoming Tasks</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                {getPriorityIcon(task.priority)}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                  <p className="text-sm text-gray-500">{task.type}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">Due {task.due}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;