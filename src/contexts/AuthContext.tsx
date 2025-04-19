import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";

// Auth context state type
interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

// Auth provider props type
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // TODO: Replace with actual backend authentication
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  // Login function - Only accept specific credentials
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Check for demo credentials
      if (email === 'pushkaraj@email.com' && password === '12345678') {
        // Mock login for development
        const mockUser = {
          id: 'user-123',
          email,
          name: 'Pushkraj',
        };
        
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        setUser(mockUser);
        setIsAuthenticated(true);
        
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
      } else {
        throw new Error('Invalid credentials. Use pushkaraj@email.com and password 12345678');
      }
      
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Signup function with error message
  const signup = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // TODO: Implement actual signup functionality
      throw new Error('Server is down, use email: pushkaraj@email.com and password: 12345678');
      
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "Please try again with a different email",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      
      // TODO: Replace with actual backend logout
      localStorage.removeItem('user');
      
      setUser(null);
      setIsAuthenticated(false);
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      
    } catch (error: any) {
      toast({
        title: "Logout failed",
        description: error.message || "An error occurred during logout",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
