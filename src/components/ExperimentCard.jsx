import React, { useState } from 'react';
import { Clock, BarChart, CheckCircle2, Cpu, ChevronRight } from 'lucide-react';
import './ExperimentCard.css';

export default function ExperimentCard({ experiment }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('application/json', JSON.stringify(experiment));
    // Optional: Add drag image or styling
  };

  return (
    <div 
      className={`experiment-card ${isHovered ? 'expanded' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      draggable
      onDragStart={handleDragStart}
    >
      <div className="card-header">
        <div className="card-icon" style={{ backgroundColor: experiment.color }}>
          {/* Using text emoji temporarily if lucide icon name doesn't perfectly match, but we can map them */}
          {experiment.icon === 'lightbulb' ? '💡' : experiment.icon === 'music' ? '🎵' : '🌡️'}
        </div>
        <h3 className="card-title">{experiment.title}</h3>
      </div>
      
      <div className="card-meta">
        <span className="badge difficulty">
          <BarChart size={14} /> {experiment.difficulty}
        </span>
        <span className="badge time">
          <Clock size={14} /> {experiment.time}
        </span>
      </div>

      <p className="card-description">{experiment.description}</p>

      <div className="card-learning-outcome">
        <strong>Learning:</strong> {experiment.learningOutcome}
      </div>

      {isHovered && (
        <div className="card-expanded-content">
          <div className="objectives">
            <h4>Objectives</h4>
            <ul>
              {experiment.objectives?.map((obj, i) => (
                <li key={i}><CheckCircle2 size={14} className="text-success" /> {obj}</li>
              ))}
            </ul>
          </div>
          <div className="components-used">
            <h4>Components Used</h4>
            <div className="component-tags">
              {experiment.components?.map((comp, i) => (
                <span key={i} className="component-tag"><Cpu size={12}/> {comp}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      <button className="btn btn-primary drag-handle">
        DRAG TO WORKBENCH <ChevronRight size={18} />
      </button>
    </div>
  );
}
