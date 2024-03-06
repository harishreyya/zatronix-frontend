import React, { useState, useEffect } from 'react';
import { OfflineMode } from './Offline';
import { OnlineMode } from './Online';

export const SignUp = () => {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleOnlineStatus = () => {
      setOnline(navigator.onLine);
    };
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  return <div>
      {online ? <OnlineMode /> : <OfflineMode />}
    </div>

    
  
};


