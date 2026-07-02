import React, { useEffect, useState } from 'react';
import { Activity, Download, Trash2, Power, PowerOff } from 'lucide-react';
import './UartMonitor.css';

export default function UartMonitor({ isExpanded, toggleExpand }) {
  const [isConnected, setIsConnected] = useState(false);
  const [dataPoints, setDataPoints] = useState(Array(50).fill(50));

  useEffect(() => {
    let interval;
    if (isConnected) {
      interval = setInterval(() => {
        setDataPoints(prev => {
          const newPoints = [...prev.slice(1)];
          // Generate random realistic looking data (temp/sensor reading style)
          const lastPoint = newPoints[newPoints.length - 1];
          let nextPoint = lastPoint + (Math.random() * 10 - 5);
          nextPoint = Math.max(10, Math.min(90, nextPoint));
          newPoints.push(nextPoint);
          return newPoints;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const generatePath = () => {
    return dataPoints.map((val, i) => `${(i / 50) * 100},${100 - val}`).join(' L ');
  };

  return (
    <div className={`uart-monitor ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="uart-header" onClick={toggleExpand}>
        <div className="header-left">
          <Activity size={18} className={isConnected ? 'text-success' : ''} />
          <h3>UART Live Data</h3>
          {isConnected && <span className="live-badge">LIVE</span>}
        </div>
        <div className="header-right">
          <span className="info-pill">COM5</span>
          <span className="info-pill">115200</span>
        </div>
      </div>

      {isExpanded && (
        <div className="uart-content">
          <div className="graph-container">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="live-graph">
              <path 
                d={`M 0,${100 - dataPoints[0]} L ${generatePath()}`} 
                fill="none" 
                stroke="var(--primary-color)" 
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path 
                d={`M 0,100 L 0,${100 - dataPoints[0]} L ${generatePath()} L 100,100 Z`} 
                fill="url(#gradient)" 
                stroke="none" 
                opacity="0.2"
              />
              <defs>
                <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary-color)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
            <div className="latest-value">
              {Math.round(dataPoints[dataPoints.length - 1])}
              <span className="unit">°C / val</span>
            </div>
          </div>
          
          <div className="uart-controls">
            <button 
              className={`btn ${isConnected ? 'btn-danger' : 'btn-success'}`}
              onClick={(e) => { e.stopPropagation(); setIsConnected(!isConnected); }}
            >
              {isConnected ? <><PowerOff size={16}/> Disconnect</> : <><Power size={16}/> Connect</>}
            </button>
            <button className="btn btn-secondary" onClick={(e) => e.stopPropagation()}>
              <Download size={16}/> Export CSV
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={(e) => { e.stopPropagation(); setDataPoints(Array(50).fill(50)); }}
            >
              <Trash2 size={16}/> Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
