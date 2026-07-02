import React, { useEffect, useState } from 'react';
import ExperimentCard from './ExperimentCard';
import './CenterArea.css';

export default function CenterArea({ activeCategory }) {
  const [experiments, setExperiments] = useState([]);

  useEffect(() => {
    fetch('/experiments.json')
      .then(res => res.json())
      .then(data => {
        setExperiments(data);
      })
      .catch(err => console.error("Failed to load experiments", err));
  }, []);

  const filteredExperiments = activeCategory === 'Beginner' 
    ? experiments 
    : experiments.filter(e => e.category === activeCategory);

  return (
    <div className="center-area">
      <div className="center-header">
        <h2>{activeCategory} Experiments</h2>
        <p>Choose an experiment to start learning. Drag it to your workbench!</p>
      </div>

      {filteredExperiments.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🚀</div>
          <h3>More coming soon!</h3>
          <p>We are constantly adding new experiments for {activeCategory}.</p>
        </div>
      ) : (
        <div className="experiment-grid">
          {filteredExperiments.map(exp => (
            <ExperimentCard key={exp.id} experiment={exp} />
          ))}
        </div>
      )}
    </div>
  );
}
