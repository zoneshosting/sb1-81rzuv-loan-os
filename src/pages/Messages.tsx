import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Search, Send, Paperclip } from 'lucide-react';

const Messages = () => {
  const conversations = [
    {
      id: 1,
      name: 'Robert Chen',
      lastMessage: 'Thank you for the update on my application',
      time: '10:30 AM',
      unread: true,
    },
    {
      id: 2,
      name: 'Sarah Miller',
      lastMessage: 'When can I expect to hear back about the approval?',
      time: 'Yesterday',
      unread: false,
    },
    // Add more conversations...
  ];

  return (
    <div className="p-6 h-[calc(100vh-4rem)]">
      <div className="flex h-full gap-6">
        <div className="w-80 flex flex-col">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input className="pl-10" placeholder="Search messages..." />
            </div>
          </div>

          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`p-3 rounded-lg cursor-pointer ${
                      conv.unread ? 'bg-primary/10' : 'hover:bg-muted'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-medium">{conv.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {conv.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="flex-1 flex flex-col">
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <CardTitle>Robert Chen</CardTitle>
              <Button variant="ghost" size="sm">
                View Profile
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {/* Message bubbles would go here */}
            </div>
          </CardContent>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Input placeholder="Type your message..." />
              <Button size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Messages;