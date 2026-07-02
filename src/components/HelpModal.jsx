import React from 'react';
import { X, Usb, Cable, Play, Zap } from 'lucide-react';
import './HelpModal.css';

export default function HelpModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="btn-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-header">
          <h2>How to Flash Your First Program</h2>
          <p>Follow these simple steps to get started!</p>
        </div>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-icon bg-blue">
              <Usb size={32} />
            </div>
            <h3>Connect ST-Link</h3>
            <p>Connect the USB side of the ST-Link programmer to your laptop.</p>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-icon bg-purple">
              <Cable size={32} />
            </div>
            <h3>Wire it Up</h3>
            <p>Connect the programmer to the Embedded Kit.<br/>
              <strong>CLK, RX, TX, GND</strong>
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-icon bg-green">
              <Play size={32} />
            </div>
            <h3>Click Flash</h3>
            <p>Click the <strong>FLASH TO KIT</strong> button and wait for the Success message.</p>
          </div>

          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-icon bg-yellow">
              <Zap size={32} />
            </div>
            <h3>Power On</h3>
            <p>Disconnect programmer and power the kit with a 5V adapter. Observe the magic!</p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>Got it, let's play!</button>
        </div>
      </div>
    </div>
  );
}
