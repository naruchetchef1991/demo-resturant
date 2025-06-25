import React, { createContext, useContext, useState, useEffect } from 'react';

const LiffContext = createContext();

export const useLiffContext = () => {
  const context = useContext(LiffContext);
  if (!context) {
    throw new Error('useLiffContext must be used within a LiffProvider');
  }
  return context;
};

export const LiffProvider = ({ children }) => {
  const [isLiffInitialized, setIsLiffInitialized] = useState(false);
  const [liffUser, setLiffUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    initializeLiff();
  }, []);

  const initializeLiff = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Check if LIFF is available
      if (typeof window.liff === 'undefined') {
        throw new Error('LIFF SDK is not loaded');
      }

      // Initialize LIFF
      const liffId = "2007640658-4a91m9P8";
      if (!liffId) {
        throw new Error('LIFF ID is not configured');
      }

      await window.liff.init({
        liffId: liffId,
        withLoginOnExternalBrowser: true
      });

      setIsLiffInitialized(true);

      // Check if user is logged in
      if (window.liff.isLoggedIn()) {
        try {
          const profile = await window.liff.getProfile();
          setLiffUser({
            userId: profile.userId,
            displayName: profile.displayName,
            pictureUrl: profile.pictureUrl,
            statusMessage: profile.statusMessage,
          });
        } catch (profileError) {
          console.error('Error getting profile:', profileError);
          // Continue without profile data
        }
      } else {
        // If not logged in, attempt login
        window.liff.login();
      }

    } catch (err) {
      console.error('LIFF initialization failed:', err);
      setError(err.message || 'Failed to initialize LINE LIFF');
    } finally {
      setIsLoading(false);
    }
  };

  const login = () => {
    if (window.liff && window.liff.isInClient()) {
      window.liff.login();
    } else {
      // For external browser
      window.liff.login({
        redirectUri: window.location.href
      });
    }
  };

  const logout = () => {
    if (window.liff) {
      window.liff.logout();
      setLiffUser(null);
    }
  };

  const closeApp = () => {
    if (window.liff && window.liff.isInClient()) {
      window.liff.closeWindow();
    }
  };

  const sendMessage = async (messages) => {
    try {
      if (window.liff && window.liff.isInClient()) {
        await window.liff.sendMessages(messages);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    }
  };

  const value = {
    isLiffInitialized,
    liffUser,
    isLoading,
    error,
    login,
    logout,
    closeApp,
    sendMessage,
    isInClient: window.liff?.isInClient() || false,
  };

  return (
    <LiffContext.Provider value={value}>
      {children}
    </LiffContext.Provider>
  );
}; 