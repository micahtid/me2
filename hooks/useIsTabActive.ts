import { useState, useEffect } from 'react';

export const useIsTabActive = () => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const onVisibilityChange = () => {
      setIsActive(!document.hidden);
    };

    // Initial state
    setIsActive(!document.hidden);

    // Add event listener
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return isActive;
};
