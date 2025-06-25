import { useState, useEffect } from 'react';

export const useLiff = () => {
  const [liff, setLiff] = useState(null);
  const [liffUser, setLiffUser] = useState(null);
  const [isLiffInitialized, setIsLiffInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInClient, setIsInClient] = useState(false);

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        // Import LIFF SDK dynamically
        const liffModule = await import('@line/liff');
        const liffSdk = liffModule.default;

        // Initialize LIFF
        await liffSdk.init({
          liffId: process.env.REACT_APP_LIFF_ID || '2006581378-8koNmNz1' // Default LIFF ID
        });

        setLiff(liffSdk);
        setIsInClient(liffSdk.isInClient());
        setIsLiffInitialized(true);

        // Get user profile if logged in
        if (liffSdk.isLoggedIn()) {
          const profile = await liffSdk.getProfile();
          setLiffUser(profile);
        } else if (liffSdk.isInClient()) {
          // Auto login if in LINE app
          liffSdk.login();
        }

        setIsLoading(false);
      } catch (err) {
        console.error('LIFF initialization failed:', err);
        setError('LIFF initialization failed: ' + err.message);
        setIsLoading(false);
        
        // For development: allow to continue without LIFF
        if (process.env.NODE_ENV === 'development') {
          setIsLiffInitialized(true);
          setLiffUser({
            userId: 'dev-user',
            displayName: 'Development User',
            pictureUrl: null
          });
        }
      }
    };

    initializeLiff();
  }, []);

  const login = () => {
    if (liff) {
      liff.login();
    }
  };

  const logout = () => {
    if (liff) {
      liff.logout();
      setLiffUser(null);
    }
  };

  const sendMessage = async (messages) => {
    if (liff && liff.isInClient()) {
      try {
        await liff.sendMessages(messages);
        return true;
      } catch (err) {
        console.error('Failed to send message:', err);
        return false;
      }
    }
    return false;
  };

  const shareTargetPicker = async (messages) => {
    if (liff) {
      try {
        await liff.shareTargetPicker(messages);
        return true;
      } catch (err) {
        console.error('Failed to share:', err);
        return false;
      }
    }
    return false;
  };

  const closeLiff = () => {
    if (liff && liff.isInClient()) {
      liff.closeWindow();
    }
  };

  return {
    liff,
    liffUser,
    isLiffInitialized,
    isLoading,
    error,
    isInClient,
    login,
    logout,
    sendMessage,
    shareTargetPicker,
    closeLiff
  };
}; 