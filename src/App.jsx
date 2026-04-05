import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { DashboardSkeleton } from './components/DashboardSkeleton';

function AppContent() {
  const { isAuthenticated, isInitialized, signIn } = useAuth();

  if (!isInitialized) {
    return <DashboardSkeleton />;
  }

  if (!isAuthenticated) {
    return <LoginPage onSignIn={signIn} />;
  }

  return <Dashboard />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
