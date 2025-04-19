
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Settings = () => {
  const { user, logout } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your account and preferences</p>
      </div>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Account Information</CardTitle>
          <CardDescription className="dark:text-gray-400">Your account details and profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
              <p className="mt-1 dark:text-white">{user?.email}</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
            <Button variant="outline" className="dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">Edit Profile</Button>
            <Button variant="outline" className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 dark:border-red-800">
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <CardTitle className="dark:text-white">Backend Integration</CardTitle>
          </div>
          <CardDescription className="dark:text-gray-400">Connect to backend services for data persistence</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md border border-amber-200 dark:border-amber-800">
            <p className="text-amber-800 dark:text-amber-300 mb-3">
              Your expense data is currently stored locally in your browser. To enable persistent storage, authentication, and advanced features, please implement a backend server connection.
            </p>
            <Button variant="outline" className="bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50">
              Set Up Backend Integration
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">App Settings</CardTitle>
          <CardDescription className="dark:text-gray-400">Configure application behavior</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-6">
            <div>
              <h3 className="font-medium mb-2 dark:text-white">Data Management</h3>
              <div className="space-y-2">
                <Button variant="outline" className="dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">Export Data</Button>
                <Button variant="outline" className="ml-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 dark:border-red-800">
                  Clear All Data
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2 dark:text-white">Account Actions</h3>
              <Button variant="destructive" onClick={logout}>
                Log Out
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
