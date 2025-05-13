import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Create context
const BrokerContext = createContext(null);

export function BrokerProvider({ children }) {
  const location = useLocation();
  const [isReadOnly, setIsReadOnly] = useState(false);
  
  // Check if URL has readonly parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const access = params.get('access');
    setIsReadOnly(access === 'readonly');
  }, [location.search]);

  return (
    <BrokerContext.Provider value={{ isReadOnly }}>
      {children}
    </BrokerContext.Provider>
  );
}

// Hook for using broker context
export function useBroker() {
  const context = useContext(BrokerContext);
  if (!context) {
    throw new Error('useBroker must be used within a BrokerProvider');
  }
  return context;
}