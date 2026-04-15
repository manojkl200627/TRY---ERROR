import React, { useEffect, useState } from 'react';
import './SplashLogo.css';

export default function SplashLogo() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3800);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="splash-overlay">
      <div className="splash-content">
        <h1 className="splash-logo"><span>instant</span>Zaa</h1>
        <div className="creative-loader">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
}
