import { useState } from 'react';
import { Play, Pause, RotateCcw, SkipForward, SkipBack } from 'lucide-react';

const ControlPanel = ({ onStart, onReset, onStepForward, onStepBack, isPlaying, onPause }) => {
  const [message, setMessage] = useState('Hello, World!');
  const [protocol, setProtocol] = useState('HTTP');
  const [transportProtocol, setTransportProtocol] = useState('TCP');

  const handleStart = () => {
    onStart({
      message,
      protocol,
      transportProtocol,
      sourceIP: '192.168.1.100',
      destIP: '8.8.8.8',
      sourceMAC: '00:1A:2B:3C:4D:5E',
      destMAC: 'FF:FF:FF:FF:FF:FF'
    });
  };

  return (
    <div className="space-y-6">
      {/* Message Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter Message
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <p className="text-xs text-gray-500 mt-1">
          {message.length} characters
        </p>
      </div>

      {/* Protocol Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Application Protocol
        </label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          value={protocol}
          onChange={(e) => setProtocol(e.target.value)}
        >
          <option value="HTTP">HTTP</option>
          <option value="HTTPS">HTTPS</option>
          <option value="FTP">FTP</option>
          <option value="SMTP">SMTP</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Transport Protocol
        </label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          value={transportProtocol}
          onChange={(e) => setTransportProtocol(e.target.value)}
        >
          <option value="TCP">TCP (Reliable)</option>
          <option value="UDP">UDP (Fast)</option>
        </select>
      </div>

      {/* Start Button */}
      <button
        onClick={handleStart}
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
      >
        Start Transmission
      </button>

      {/* Animation Controls */}
      <div className="border-t pt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Animation Controls</h3>
        <div className="flex gap-2">
          <button
            onClick={onStepBack}
            className="flex-1 p-2 border border-gray-300 rounded hover:bg-gray-50 flex justify-center items-center"
            title="Step Back"
          >
            <SkipBack className="w-5 h-5" />
          </button>
          
          {isPlaying ? (
            <button
              onClick={onPause}
              className="flex-1 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex justify-center items-center"
              title="Pause"
            >
              <Pause className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={onStart}
              className="flex-1 p-2 bg-green-500 text-white rounded hover:bg-green-600 flex justify-center items-center"
              title="Play"
            >
              <Play className="w-5 h-5" />
            </button>
          )}
          
          <button
            onClick={onStepForward}
            className="flex-1 p-2 border border-gray-300 rounded hover:bg-gray-50 flex justify-center items-center"
            title="Step Forward"
          >
            <SkipForward className="w-5 h-5" />
          </button>
          
          <button
            onClick={onReset}
            className="flex-1 p-2 bg-red-500 text-white rounded hover:bg-red-600 flex justify-center items-center"
            title="Reset"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-gray-50 p-4 rounded-md">
        <h4 className="text-sm font-medium mb-2">Legend</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Active Layer</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Data Present</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
