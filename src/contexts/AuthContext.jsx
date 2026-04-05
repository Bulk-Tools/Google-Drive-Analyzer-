import { createContext, useContext, useState, useEffect } from 'react';
import { driveService } from '@/lib/googleDriveService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Wait for Google API to load
        await driveService.initClient();

        // Initialize token client
        driveService.initTokenClient((response) => {
          if (response.error) {
            console.error('Auth error:', response.error);
            setIsAuthenticated(false);
            return;
          }

          setIsAuthenticated(true);
          // You could decode the token here to get user info
        });

        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        setIsInitialized(true);
      }
    };

    // Check if gapi is loaded
    if (window.gapi) {
      initializeAuth();
    } else {
      // Wait for gapi to load
      const checkGapi = setInterval(() => {
        if (window.gapi && window.google) {
          clearInterval(checkGapi);
          initializeAuth();
        }
      }, 100);

      // Cleanup interval after 10 seconds
      setTimeout(() => clearInterval(checkGapi), 10000);
    }
  }, []);

  const signIn = async () => {
    try {
      await driveService.requestAccessToken();
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signOut = () => {
    driveService.revokeToken();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isInitialized,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
