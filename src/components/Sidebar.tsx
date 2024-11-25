import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  FileText,
  Users,
  MessageSquare,
  CheckSquare,
  BarChart2,
  Settings,
  FolderOpen,
  LogOut,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Sidebar = () => {
  const location = useLocation();
  const { signOut } = useAuthStore();

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/' },
    { icon: FileText, label: 'Loan Pipeline', href: '/pipeline' },
    { icon: FolderOpen, label: 'Documents', href: '/documents' },
    { icon: Users, label: 'Clients', href: '/clients' },
    { icon: MessageSquare, label: 'Messages', href: '/messages' },
    { icon: CheckSquare, label: 'Tasks', href: '/tasks' },
    { icon: BarChart2, label: 'Reports', href: '/reports' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="bg-[#1a2b4c] text-white w-64 min-h-screen p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-8 px-2">
        <FileText className="w-8 h-8" />
        <span className="text-xl font-bold">LendFlow Pro</span>
      </div>
      
      <nav className="flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname === item.href
                ? 'bg-white/10 text-white'
                : 'text-gray-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <button
        onClick={handleSignOut}
        className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-3 mt-auto"
      >
        <LogOut className="w-5 h-5" />
        <span>Sign Out</span>
      </button>
    </div>
  );
};

export default Sidebar;