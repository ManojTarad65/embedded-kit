import React, { useState, useEffect } from 'react';
import TopNavBar from './components/TopNavBar';
import LeftSidebar from './components/LeftSidebar';
import CenterArea from './components/CenterArea';
import RightPanel from './components/RightPanel';
import UartMonitor from './components/UartMonitor';
import BottomStatusBar from './components/BottomStatusBar';
import HelpModal from './components/HelpModal';
import './index.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [activeCategory, setActiveCategory] = useState('Beginner');
  const [selectedExperiment, setSelectedExperiment] = useState(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isUartExpanded, setIsUartExpanded] = useState(false);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app-container">
      <TopNavBar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        openHelp={() => setIsHelpOpen(true)} 
      />
      
      <div className="main-content">
        <LeftSidebar 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
        
        <CenterArea 
          activeCategory={activeCategory} 
        />
        
        <RightPanel 
          selectedExperiment={selectedExperiment}
          setSelectedExperiment={setSelectedExperiment}
        />
      </div>

      <UartMonitor 
        isExpanded={isUartExpanded} 
        toggleExpand={() => setIsUartExpanded(!isUartExpanded)} 
      />

      <BottomStatusBar />

      <HelpModal 
        isOpen={isHelpOpen} 
        onClose={() => setIsHelpOpen(false)} 
      />
    </div>
  );
}

export default App;
