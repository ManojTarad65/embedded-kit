import React, { useState } from 'react';
import { UploadCloud, Play, CheckCircle2, AlertCircle, Terminal, X, Code2 } from 'lucide-react';
import './RightPanel.css';

export default function RightPanel({ selectedExperiment, setSelectedExperiment }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [flashStatus, setFlashStatus] = useState('idle'); // idle, flashing, success, error
  const [progress, setProgress] = useState(0);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data && data.id) {
        setSelectedExperiment(data);
        setFlashStatus('idle');
        setProgress(0);
      }
    } catch (err) {
      console.error("Failed to parse drop data");
    }
  };

  const handleFlash = () => {
    if (!selectedExperiment || flashStatus === 'flashing') return;
    
    setFlashStatus('flashing');
    setProgress(0);
    
    // Simulate flashing progress
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setFlashStatus('success');
          return 100;
        }
        return p + 5;
      });
    }, 100);
  };

  const handleClear = () => {
    setSelectedExperiment(null);
    setFlashStatus('idle');
    setProgress(0);
  };

  return (
    <aside className="right-panel">
      <div 
        className={`workbench-dropzone ${isDragOver ? 'drag-over' : ''} ${selectedExperiment ? 'has-item' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!selectedExperiment ? (
          <div className="dropzone-content">
            <UploadCloud size={48} className="drop-icon" />
            <h3>Drop Experiment Here</h3>
            <p>Drag a card from the left</p>
          </div>
        ) : (
          <div className="selected-experiment">
            <button className="btn-clear" onClick={handleClear}><X size={16} /></button>
            <div className="selected-icon" style={{ backgroundColor: selectedExperiment.color }}>
              {selectedExperiment.icon === 'lightbulb' ? '💡' : selectedExperiment.icon === 'music' ? '🎵' : '🌡️'}
            </div>
            <h3>{selectedExperiment.title}</h3>
            <div className="hex-file">
              <Code2 size={16} /> {selectedExperiment.hexFile}
            </div>
            <div className="status-badge ready">Ready to Flash</div>
          </div>
        )}
      </div>

      <div className="flash-panel">
        <h3 className="panel-title">Flasher</h3>
        
        <button 
          className={`btn ${flashStatus === 'flashing' ? 'btn-flashing' : 'btn-success'} flash-btn`}
          onClick={handleFlash}
          disabled={!selectedExperiment || flashStatus === 'flashing'}
        >
          {flashStatus === 'flashing' ? 'FLASHING...' : (
            <>
              <Play size={20} /> FLASH TO KIT
            </>
          )}
        </button>

        {flashStatus !== 'idle' && (
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="progress-text">{progress}%</div>
          </div>
        )}

        <div className="console-container">
          <div className="console-header">
            <Terminal size={14} /> Console
          </div>
          <div className="console-output">
            {flashStatus === 'idle' && '> Waiting for command...\n'}
            {flashStatus === 'flashing' && '> Erasing flash memory...\n> Writing demo001.hex...\n> Verifying...'}
            {flashStatus === 'success' && (
              <span className="text-success">
                {'>'} Flashing successful! 🚀<br/>
                {'>'} Disconnect programmer and power on the kit.
              </span>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
