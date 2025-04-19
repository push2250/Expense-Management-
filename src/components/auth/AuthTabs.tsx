
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="shadow-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">ExpenseTrack</CardTitle>
          <CardDescription>
            Manage your personal finances with ease
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="signup">
              <SignupForm />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col text-center text-sm text-gray-500">
          <p>
            This application will connect to Supabase for authentication once you set up the integration.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthTabs;
