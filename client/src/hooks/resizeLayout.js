import { useState, useEffect } from 'react';

export const useResizeLayout = () => {

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 768);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    
    // Return any values or functions that you want to expose
    return { isSmallScreen };
}
