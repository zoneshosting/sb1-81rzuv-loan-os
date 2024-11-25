import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Search, Plus, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Tasks = () => {
  const tasks = [
    {
      id: 1,
      title: 'Review Johnson Application',
      description: 'Complete initial review of loan application',
      priority: 'high',
      dueDate: '2024-03-20',
      assignee: 'Sarah Wilson',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Update Miller Credit Report',
      description: 'Request and review updated credit report',
      priority: 'medium',
      dueDate: '2024-03-21',
      assignee: 'John Smith',
      status: 'in-progress',
    },
    // Add more tasks...
  ];

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      case 'medium':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Task Management</h1>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Task
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input className="pl-10" placeholder="Search tasks..." />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="bg-muted/50">
            <CardTitle className="text-lg">To Do</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {tasks
              .filter((task) => task.status === 'pending')
              .map((task) => (
                <div
                  key={task.id}
                  className="p-4 mb-4 bg-card rounded-lg border shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{task.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {task.description}
                      </p>
                    </div>
                    {getPriorityIcon(task.priority)}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Due: {task.dueDate}
                    </span>
                    <span className="text-primary">{task.assignee}</span>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-muted/50">
            <CardTitle className="text-lg">In Progress</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {tasks
              .filter((task) => task.status === 'in-progress')
              .map((task) => (
                <div
                  key={task.id}
                  className="p-4 mb-4 bg-card rounded-lg border shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{task.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {task.description}
                      </p>
                    </div>
                    {getPriorityIcon(task.priority)}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Due: {task.dueDate}
                    </span>
                    <span className="text-primary">{task.assignee}</span>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-muted/50">
            <CardTitle className="text-lg">Completed</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {/* Completed tasks would go here */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tasks;