import React from 'react';
import { DeviceConfig } from '../types';
import { Wifi, Signal } from 'lucide-react';

interface DeviceFrameProps {
  device: DeviceConfig;
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ device, children }) => {
  const getBatteryColor = (level: number) => {
    if (level > 50) return '#34D399';
    if (level > 20) return '#FBBF24';
    return '#EF4444';
  };

  return (
    <div className="relative bg-black rounded-[60px] p-3 shadow-2xl">
      <div className="relative bg-gray-900 rounded-[48px] overflow-hidden" style={{ width: '390px', height: '844px' }}>
        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-transparent z-20">
          <div className="flex justify-between items-center px-8 pt-2">
            <div className="text-white text-lg font-medium">
              {device.time}
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-white text-sm">{device.carrier}</span>
              {device.wifi && <Wifi size={20} className="text-white" />}
              <Signal size={20} className="text-white" />
              <div className="flex items-center">
                <div className="text-white text-sm mr-1">{device.battery}%</div>
                <div className="relative w-6 h-3 border border-white rounded-sm">
                  <div className="absolute top-0 right-0 w-0.5 h-1 bg-white rounded-r-sm transform translate-x-0.5 translate-y-0.5" />
                  <div 
                    className="h-full rounded-sm transition-all duration-300"
                    style={{ 
                      width: `${device.battery}%`,
                      backgroundColor: getBatteryColor(device.battery)
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black rounded-full w-32 h-8" />
        </div>
        
        {/* Content Area */}
        <div className="relative h-full pt-12">
          {children}
        </div>
      </div>
    </div>
  );
};