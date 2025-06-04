import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { useTheme } from './contexts/ThemeContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

// Components
import LoadingScreen from './components/ui/LoadingScreen';

function App() {
  const { isAuthenticated, loading } = useAuth();
  const { theme } = useTheme();
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsAppReady(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Show loading screen while app is initializing
  if (!isAppReady || loading) {
    return <LoadingScreen />;
  }

  return (
    <div className={theme}>
      <Routes>
        {/* Protected Routes */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? <MainLayout /> : <Navigate to="/login\" replace />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Auth Routes */}
        <Route 
          path="/" 
          element={
            !isAuthenticated ? <AuthLayout /> : <Navigate to="/\" replace />
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;