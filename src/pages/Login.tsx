
import { Navigate } from 'react-router-dom';
import { AuthTabs } from '@/components';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const { isAuthenticated, loading } = useAuth();

  // If loading, show a loading screen
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse text-lg font-medium text-gray-800 dark:text-gray-200">Loading...</div>
      </div>
    );
  }

  // If authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <AuthTabs />
      </div>
    </div>
  );
};

export default Login;
