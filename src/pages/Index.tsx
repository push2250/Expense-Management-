
import { Navigate } from 'react-router-dom';

// Redirect root path to dashboard
const Index = () => {
  return <Navigate to="/login" replace />;
};

export default Index;
