import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import DashboardContent from './components/DashboardContent';
import LoanPipeline from './pages/LoanPipeline';
import Documents from './pages/Documents';
import Clients from './pages/Clients';
import Messages from './pages/Messages';
import Tasks from './pages/Tasks';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import LoginForm from './components/auth/LoginForm';
import { useAuthStore } from './store/authStore';
import { supabase, initializeSchema } from './lib/supabase';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    // Initialize Supabase schema
    initializeSchema();

    // Check active sessions and update auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route 
          path="/login" 
          element={user ? <Navigate to="/" replace /> : <LoginForm />} 
        />
        
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex min-h-screen bg-gray-100">
                <Sidebar />
                <div className="flex-1 p-8 overflow-y-auto">
                  <Routes>
                    <Route path="/" element={<DashboardContent />} />
                    <Route path="/pipeline" element={<LoanPipeline />} />
                    <Route path="/documents" element={<Documents />} />
                    <Route path="/clients" element={<Clients />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;