import React from 'react';
import { Lightbulb, Music, Square, Monitor, Wifi, Activity, Thermometer, Bluetooth, Globe, Settings, Star } from 'lucide-react';
import './LeftSidebar.css';

const CATEGORIES = [
  { name: 'Beginner', icon: Star, color: '#F59E0B' },
  { name: 'LEDs', icon: Lightbulb, color: '#4ADE80' },
  { name: 'Sound', icon: Music, color: '#60A5FA' },
  { name: 'Buttons', icon: Square, color: '#F472B6' },
  { name: 'LCD Display', icon: Monitor, color: '#A78BFA' },
  { name: 'UART', icon: Wifi, color: '#38BDF8' },
  { name: 'Sensors', icon: Activity, color: '#FB923C' },
  { name: 'Temperature', icon: Thermometer, color: '#F87171' },
  { name: 'Bluetooth', icon: Bluetooth, color: '#818CF8' },
  { name: 'IoT', icon: Globe, color: '#34D399' },
  { name: 'Advanced', icon: Settings, color: '#94A3B8' },
];

export default function LeftSidebar({ activeCategory, setActiveCategory }) {
  return (
    <aside className="left-sidebar">
      <h2 className="sidebar-title">Categories</h2>
      <ul className="category-list">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.name;
          return (
            <li key={cat.name}>
              <button 
                className={`category-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.name)}
              >
                <div 
                  className="icon-container" 
                  style={{ backgroundColor: isActive ? cat.color : 'transparent', color: isActive ? '#fff' : cat.color }}
                >
                  <Icon size={20} />
                </div>
                <span className="category-name">{cat.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
