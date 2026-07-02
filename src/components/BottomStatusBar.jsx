import React from 'react';
import { Cpu, Usb, Zap, HardDrive, ShieldCheck } from 'lucide-react';
import './BottomStatusBar.css';

export default function BottomStatusBar() {
  return (
    <footer className="bottom-status-bar">
      <div className="status-item">
        <Cpu size={14} />
        <span>Board: <strong>STM32F103C8</strong></span>
      </div>
      <div className="status-divider"></div>
      <div className="status-item">
        <Usb size={14} />
        <span>Port: <strong>COM5</strong></span>
      </div>
      <div className="status-divider"></div>
      <div className="status-item">
        <Zap size={14} />
        <span>Baud: <strong>115200</strong></span>
      </div>
      <div className="status-divider"></div>
      <div className="status-item">
        <HardDrive size={14} />
        <span>Firmware: <strong>v1.0</strong></span>
      </div>
      
      <div className="status-right">
        <div className="status-item success">
          <ShieldCheck size={14} />
          <span>Programmer Connected: <strong>YES</strong></span>
        </div>
        <div className="status-item highlight">
          <span>Flash Status: <strong>Ready</strong></span>
        </div>
      </div>
    </footer>
  );
}
