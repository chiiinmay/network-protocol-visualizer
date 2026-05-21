# Network Protocol Visualizer & Simulator - Implementation Plan

## 📋 Project Overview

**Project Name:** Network Protocol Visualizer & Simulator  
**Objective:** Build an interactive web application that visualizes data flow through OSI layers with encapsulation/decapsulation process  
**Target Users:** Computer Networks students, educators, network enthusiasts  
**Estimated Timeline:** 3-4 weeks  

---

## 🎯 Core Features

### Must-Have Features (MVP)
1. ✅ Interactive OSI layer visualization (7 layers)
2. ✅ Message input and transmission simulation
3. ✅ Encapsulation process (adding headers at each layer)
4. ✅ Decapsulation process (removing headers at each layer)
5. ✅ Color-coded representation for each layer
6. ✅ Step-by-step animation controls (play, pause, step-forward, step-back)
7. ✅ Display protocol headers at each layer

### Nice-to-Have Features (Phase 2)
- 📊 Protocol selection (TCP vs UDP, HTTP vs FTP, etc.)
- 🔍 Detailed header field inspection
- 📈 Data size tracking through layers
- 💾 Save/load different scenarios
- 🎓 Educational tooltips and explanations
- 🌐 Multiple transmission scenarios (email, web browsing, file transfer)

---

## 🏗️ Technical Architecture

### Technology Stack

**Frontend:**
- **Framework:** React.js (v18+)
- **Styling:** Tailwind CSS + Custom CSS animations
- **Animation:** Framer Motion or React Spring
- **State Management:** React Context API (or Zustand for simpler state)
- **Icons:** React Icons or Lucide React

**Build Tools:**
- Vite (fast development server)
- ESLint + Prettier (code quality)

**Optional Backend (for advanced features):**
- Node.js + Express (if saving scenarios to cloud)
- JSON file storage (for local version)

---

## 📁 Project Structure

```
network-protocol-visualizer/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── LayerStack/
│   │   │   ├── LayerStack.jsx
│   │   │   ├── Layer.jsx
│   │   │   └── LayerStack.css
│   │   ├── DataPacket/
│   │   │   ├── DataPacket.jsx
│   │   │   ├── HeaderSegment.jsx
│   │   │   └── DataPacket.css
│   │   ├── ControlPanel/
│   │   │   ├── ControlPanel.jsx
│   │   │   ├── InputForm.jsx
│   │   │   └── AnimationControls.jsx
│   │   ├── InfoPanel/
│   │   │   ├── InfoPanel.jsx
│   │   │   ├── LayerInfo.jsx
│   │   │   └── HeaderDetails.jsx
│   │   └── Visualizer/
│   │       ├── Visualizer.jsx
│   │       ├── TransmissionAnimation.jsx
│   │       └── Visualizer.css
│   ├── data/
│   │   ├── osiLayers.js
│   │   ├── protocols.js
│   │   └── sampleScenarios.js
│   ├── utils/
│   │   ├── encapsulation.js
│   │   ├── decapsulation.js
│   │   └── protocolHeaders.js
│   ├── context/
│   │   └── SimulationContext.jsx
│   ├── hooks/
│   │   ├── useSimulation.js
│   │   └── useAnimation.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🎨 Design Specifications

### Color Scheme (OSI Layers)

```javascript
const OSI_COLORS = {
  7: { name: "Application", color: "#FF6B6B", bg: "#FFE5E5" },
  6: { name: "Presentation", color: "#4ECDC4", bg: "#E5F9F7" },
  5: { name: "Session", color: "#45B7D1", bg: "#E5F4F9" },
  4: { name: "Transport", color: "#FFA07A", bg: "#FFEEE8" },
  3: { name: "Network", color: "#98D8C8", bg: "#E8F7F3" },
  2: { name: "Data Link", color: "#F7DC6F", bg: "#FEF9E7" },
  1: { name: "Physical", color: "#BB8FCE", bg: "#F4ECF7" }
};
```

### Layout Design

```
+----------------------------------------------------------+
|                     HEADER / TITLE                        |
+----------------------------------------------------------+
|                                                           |
|  +-----------------+  +-------------------------+         |
|  |                 |  |                         |         |
|  |  Control Panel  |  |   OSI Layer Stack       |         |
|  |                 |  |   (Visualization)       |         |
|  |  - Input Form   |  |                         |         |
|  |  - Protocol     |  |   [Application Layer]   |         |
|  |    Selection    |  |   [Presentation Layer]  |         |
|  |  - Animation    |  |   [Session Layer]       |         |
|  |    Controls     |  |   [Transport Layer]     |         |
|  |                 |  |   [Network Layer]       |         |
|  |                 |  |   [Data Link Layer]     |         |
|  +-----------------+  |   [Physical Layer]      |         |
|                       +-------------------------+         |
|  +--------------------------------------------------+    |
|  |            Information Panel                     |    |
|  |  - Current Layer Details                         |    |
|  |  - Header Information                            |    |
|  |  - Protocol Details                              |    |
|  +--------------------------------------------------+    |
+----------------------------------------------------------+
```

---

## 📝 Step-by-Step Implementation

---

## **PHASE 1: Project Setup & Foundation** (Days 1-2)

### Step 1.1: Initialize Project

```bash
# Create project with Vite
npm create vite@latest network-protocol-visualizer -- --template react

# Navigate to project
cd network-protocol-visualizer

# Install dependencies
npm install

# Install additional packages
npm install framer-motion lucide-react zustand
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 1.2: Configure Tailwind CSS

**tailwind.config.js:**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        application: '#FF6B6B',
        presentation: '#4ECDC4',
        session: '#45B7D1',
        transport: '#FFA07A',
        network: '#98D8C8',
        datalink: '#F7DC6F',
        physical: '#BB8FCE',
      }
    },
  },
  plugins: [],
}
```

**src/index.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-gray-50 text-gray-900;
  }
}

@layer components {
  .layer-card {
    @apply rounded-lg shadow-md p-4 transition-all duration-300;
  }
  
  .header-segment {
    @apply border-2 border-dashed rounded p-2 m-1;
  }
}
```

### Step 1.3: Create Base App Structure

**src/App.jsx:**
```jsx
import { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-indigo-600">
            Network Protocol Visualizer
          </h1>
          <p className="text-gray-600 mt-2">
            Visualize data flow through OSI layers
          </p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Control Panel - Left Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Control Panel</h2>
              {/* Control panel will go here */}
            </div>
          </div>
          
          {/* Visualization Area - Right Columns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">OSI Model Visualization</h2>
              {/* Visualization will go here */}
            </div>
          </div>
        </div>
        
        {/* Info Panel - Bottom */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Information Panel</h2>
          {/* Information panel will go here */}
        </div>
      </main>
    </div>
  );
}

export default App;
```

---

## **PHASE 2: Data Models & Core Logic** (Days 3-4)

### Step 2.1: Create OSI Layer Data Model

**src/data/osiLayers.js:**
```javascript
export const OSI_LAYERS = [
  {
    id: 7,
    name: "Application Layer",
    shortName: "Application",
    color: "#FF6B6B",
    bgColor: "#FFE5E5",
    protocols: ["HTTP", "HTTPS", "FTP", "SMTP", "DNS"],
    description: "Provides network services directly to end-user applications",
    pdu: "Data",
    functions: [
      "Resource sharing",
      "Remote file access",
      "Network virtual terminal",
      "Email services"
    ],
    headerFields: ["Method", "URL", "Headers", "Cookies"]
  },
  {
    id: 6,
    name: "Presentation Layer",
    shortName: "Presentation",
    color: "#4ECDC4",
    bgColor: "#E5F9F7",
    protocols: ["SSL/TLS", "JPEG", "MPEG", "ASCII"],
    description: "Translates data formats, encryption, and compression",
    pdu: "Data",
    functions: [
      "Data encryption/decryption",
      "Data compression",
      "Data translation",
      "Format conversion"
    ],
    headerFields: ["Encoding", "Compression", "Encryption"]
  },
  {
    id: 5,
    name: "Session Layer",
    shortName: "Session",
    color: "#45B7D1",
    bgColor: "#E5F4F9",
    protocols: ["NetBIOS", "RPC", "PPTP"],
    description: "Manages sessions and controls dialogs between computers",
    pdu: "Data",
    functions: [
      "Session establishment",
      "Session maintenance",
      "Session termination",
      "Synchronization"
    ],
    headerFields: ["Session ID", "Sequence Number"]
  },
  {
    id: 4,
    name: "Transport Layer",
    shortName: "Transport",
    color: "#FFA07A",
    bgColor: "#FFEEE8",
    protocols: ["TCP", "UDP"],
    description: "Provides reliable data transfer services",
    pdu: "Segment (TCP) / Datagram (UDP)",
    functions: [
      "Segmentation",
      "Flow control",
      "Error control",
      "Port addressing"
    ],
    headerFields: ["Source Port", "Dest Port", "Sequence #", "ACK #", "Checksum"]
  },
  {
    id: 3,
    name: "Network Layer",
    shortName: "Network",
    color: "#98D8C8",
    bgColor: "#E8F7F3",
    protocols: ["IP", "ICMP", "ARP", "IGMP"],
    description: "Routes packets across networks using logical addresses",
    pdu: "Packet",
    functions: [
      "Logical addressing",
      "Routing",
      "Path determination",
      "Packet forwarding"
    ],
    headerFields: ["Source IP", "Dest IP", "TTL", "Protocol", "Checksum"]
  },
  {
    id: 2,
    name: "Data Link Layer",
    shortName: "Data Link",
    color: "#F7DC6F",
    bgColor: "#FEF9E7",
    protocols: ["Ethernet", "PPP", "HDLC", "Frame Relay"],
    description: "Provides node-to-node data transfer and error detection",
    pdu: "Frame",
    functions: [
      "Framing",
      "Physical addressing (MAC)",
      "Error detection",
      "Flow control"
    ],
    headerFields: ["Source MAC", "Dest MAC", "Frame Type", "FCS"]
  },
  {
    id: 1,
    name: "Physical Layer",
    shortName: "Physical",
    color: "#BB8FCE",
    bgColor: "#F4ECF7",
    protocols: ["Ethernet Physical", "USB", "Bluetooth", "DSL"],
    description: "Transmits raw bit stream over physical medium",
    pdu: "Bits",
    functions: [
      "Bit synchronization",
      "Transmission mode",
      "Physical topology",
      "Signal encoding"
    ],
    headerFields: ["Preamble", "Start Frame Delimiter"]
  }
];

export const getLayerById = (id) => {
  return OSI_LAYERS.find(layer => layer.id === id);
};

export const getLayerByName = (name) => {
  return OSI_LAYERS.find(layer => 
    layer.name.toLowerCase() === name.toLowerCase() ||
    layer.shortName.toLowerCase() === name.toLowerCase()
  );
};
```

### Step 2.2: Create Protocol Headers Generator

**src/utils/protocolHeaders.js:**
```javascript
export const generateHeaders = (layerId, message, options = {}) => {
  const headers = {};
  
  switch(layerId) {
    case 7: // Application Layer
      headers.protocol = options.protocol || "HTTP";
      headers.method = "GET";
      headers.url = "/data";
      headers.version = "HTTP/1.1";
      headers.contentType = "text/plain";
      headers.contentLength = message.length;
      break;
      
    case 6: // Presentation Layer
      headers.encoding = "UTF-8";
      headers.compression = options.compression || "none";
      headers.encryption = options.encryption || "none";
      break;
      
    case 5: // Session Layer
      headers.sessionId = generateSessionId();
      headers.sequenceNumber = 1;
      headers.timestamp = Date.now();
      break;
      
    case 4: // Transport Layer
      headers.protocol = options.transportProtocol || "TCP";
      headers.sourcePort = 12345;
      headers.destPort = 80;
      headers.sequenceNumber = Math.floor(Math.random() * 1000000);
      headers.ackNumber = 0;
      headers.flags = "SYN";
      headers.windowSize = 65535;
      headers.checksum = calculateChecksum(message);
      break;
      
    case 3: // Network Layer
      headers.protocol = "IPv4";
      headers.sourceIP = options.sourceIP || "192.168.1.100";
      headers.destIP = options.destIP || "192.168.1.1";
      headers.version = 4;
      headers.ttl = 64;
      headers.protocol = "TCP";
      headers.checksum = calculateChecksum(message);
      break;
      
    case 2: // Data Link Layer
      headers.protocol = "Ethernet";
      headers.sourceMAC = options.sourceMAC || "00:1A:2B:3C:4D:5E";
      headers.destMAC = options.destMAC || "00:1A:2B:3C:4D:5F";
      headers.etherType = "0x0800"; // IPv4
      headers.fcs = calculateFCS(message);
      break;
      
    case 1: // Physical Layer
      headers.preamble = "10101010".repeat(7);
      headers.sfd = "10101011"; // Start Frame Delimiter
      headers.encoding = "Manchester";
      break;
      
    default:
      break;
  }
  
  return headers;
};

const generateSessionId = () => {
  return Math.random().toString(36).substr(2, 9).toUpperCase();
};

const calculateChecksum = (data) => {
  // Simple checksum calculation (sum of character codes mod 65536)
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data.charCodeAt(i);
  }
  return (sum % 65536).toString(16).toUpperCase().padStart(4, '0');
};

const calculateFCS = (data) => {
  // Frame Check Sequence (simple CRC simulation)
  return calculateChecksum(data);
};

export const formatHeaderForDisplay = (headers) => {
  return Object.entries(headers).map(([key, value]) => ({
    field: key.replace(/([A-Z])/g, ' $1').trim(),
    value: value.toString()
  }));
};
```

### Step 2.3: Create Encapsulation Logic

**src/utils/encapsulation.js:**
```javascript
import { OSI_LAYERS } from '../data/osiLayers';
import { generateHeaders } from './protocolHeaders';

export class DataPacket {
  constructor(originalData, options = {}) {
    this.originalData = originalData;
    this.options = options;
    this.layers = [];
    this.currentLayer = 7;
  }

  encapsulate() {
    // Start from Application layer (7) down to Physical layer (1)
    let data = this.originalData;
    
    for (let layerId = 7; layerId >= 1; layerId--) {
      const layer = OSI_LAYERS.find(l => l.id === layerId);
      const headers = generateHeaders(layerId, data, this.options);
      
      const layerData = {
        layerId,
        layerName: layer.name,
        color: layer.color,
        bgColor: layer.bgColor,
        pdu: layer.pdu,
        headers,
        payload: data,
        size: this.calculateSize(headers, data)
      };
      
      this.layers.push(layerData);
      
      // For next iteration, the entire packet becomes the payload
      data = { headers, payload: data };
    }
    
    return this.layers;
  }

  decapsulate() {
    // Process from Physical layer (1) up to Application layer (7)
    const decapsulatedLayers = [];
    
    for (let i = this.layers.length - 1; i >= 0; i--) {
      decapsulatedLayers.push({
        ...this.layers[i],
        action: 'remove',
        step: this.layers.length - i
      });
    }
    
    return decapsulatedLayers;
  }

  calculateSize(headers, data) {
    const headerSize = JSON.stringify(headers).length;
    const dataSize = typeof data === 'string' ? data.length : JSON.stringify(data).length;
    return headerSize + dataSize;
  }

  getLayerAtStep(step, direction = 'encapsulation') {
    if (direction === 'encapsulation') {
      return this.layers[step] || null;
    } else {
      return this.layers[this.layers.length - 1 - step] || null;
    }
  }

  getTotalSteps() {
    return this.layers.length;
  }
}

export const createTransmissionSequence = (message, options = {}) => {
  const packet = new DataPacket(message, options);
  const encapsulationSteps = packet.encapsulate();
  
  return {
    originalMessage: message,
    encapsulation: encapsulationSteps,
    transmission: encapsulationSteps[encapsulationSteps.length - 1], // Physical layer
    decapsulation: encapsulationSteps.slice().reverse(),
    totalSteps: encapsulationSteps.length * 2 // Encapsulation + Decapsulation
  };
};
```

---

## **PHASE 3: UI Components** (Days 5-8)

### Step 3.1: Create Layer Component

**src/components/LayerStack/Layer.jsx:**
```jsx
import { motion } from 'framer-motion';

const Layer = ({ layer, isActive, hasData, onClick, dataPacket }) => {
  return (
    <motion.div
      className={`layer-card cursor-pointer ${isActive ? 'ring-2 ring-blue-500' : ''}`}
      style={{
        backgroundColor: layer.bgColor,
        borderLeft: `4px solid ${layer.color}`
      }}
      onClick={() => onClick(layer.id)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: layer.color }}
            >
              {layer.id}
            </span>
            <div>
              <h3 className="font-semibold text-gray-800">{layer.shortName}</h3>
              <p className="text-xs text-gray-600">{layer.pdu}</p>
            </div>
          </div>
        </div>
        
        {hasData && (
          <motion.div
            className="w-3 h-3 bg-green-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
      </div>
      
      {dataPacket && (
        <motion.div 
          className="mt-3 p-2 bg-white rounded text-xs"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <div className="font-mono text-gray-700">
            {Object.entries(dataPacket.headers).slice(0, 3).map(([key, value]) => (
              <div key={key} className="truncate">
                <span className="font-semibold">{key}:</span> {value}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Layer;
```

### Step 3.2: Create Layer Stack Component

**src/components/LayerStack/LayerStack.jsx:**
```jsx
import { OSI_LAYERS } from '../../data/osiLayers';
import Layer from './Layer';

const LayerStack = ({ currentStep, direction, dataPackets, onLayerClick }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          {direction === 'encapsulation' ? '📥 Encapsulation' : '📤 Decapsulation'}
        </h3>
        <span className="text-sm text-gray-600">
          Step {currentStep + 1} of {OSI_LAYERS.length}
        </span>
      </div>
      
      <div className="space-y-2">
        {OSI_LAYERS.map((layer, index) => {
          const isActive = direction === 'encapsulation' 
            ? index === (7 - currentStep - 1)
            : index === currentStep;
            
          const hasData = direction === 'encapsulation'
            ? index >= (7 - currentStep - 1)
            : index <= currentStep;
            
          const dataPacket = dataPackets?.find(p => p.layerId === layer.id);
          
          return (
            <Layer
              key={layer.id}
              layer={layer}
              isActive={isActive}
              hasData={hasData}
              dataPacket={isActive ? dataPacket : null}
              onClick={onLayerClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LayerStack;
```

### Step 3.3: Create Control Panel

**src/components/ControlPanel/ControlPanel.jsx:**
```jsx
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
            className="flex-1 p-2 border border-gray-300 rounded hover:bg-gray-50"
            title="Step Back"
          >
            <SkipBack className="w-5 h-5 mx-auto" />
          </button>
          
          {isPlaying ? (
            <button
              onClick={onPause}
              className="flex-1 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              title="Pause"
            >
              <Pause className="w-5 h-5 mx-auto" />
            </button>
          ) : (
            <button
              onClick={onStart}
              className="flex-1 p-2 bg-green-500 text-white rounded hover:bg-green-600"
              title="Play"
            >
              <Play className="w-5 h-5 mx-auto" />
            </button>
          )}
          
          <button
            onClick={onStepForward}
            className="flex-1 p-2 border border-gray-300 rounded hover:bg-gray-50"
            title="Step Forward"
          >
            <SkipForward className="w-5 h-5 mx-auto" />
          </button>
          
          <button
            onClick={onReset}
            className="flex-1 p-2 bg-red-500 text-white rounded hover:bg-red-600"
            title="Reset"
          >
            <RotateCcw className="w-5 h-5 mx-auto" />
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
```

### Step 3.4: Create Info Panel

**src/components/InfoPanel/InfoPanel.jsx:**
```jsx
import { Info, Server, Package } from 'lucide-react';

const InfoPanel = ({ currentLayer, dataPacket, direction }) => {
  if (!currentLayer || !dataPacket) {
    return (
      <div className="text-center text-gray-500 py-8">
        <Info className="w-12 h-12 mx-auto mb-3 text-gray-400" />
        <p>Start a transmission to see details</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Layer Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <Server className="w-5 h-5" style={{ color: currentLayer.color }} />
          <h3 className="font-semibold">{currentLayer.name}</h3>
        </div>
        <p className="text-sm text-gray-700 mb-3">{currentLayer.description}</p>
        <div className="space-y-2">
          <div className="text-xs">
            <span className="font-medium">PDU:</span> {currentLayer.pdu}
          </div>
          <div className="text-xs">
            <span className="font-medium">Protocols:</span> {currentLayer.protocols.join(', ')}
          </div>
        </div>
      </div>

      {/* Header Details */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <Package className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold">Header Information</h3>
        </div>
        <div className="space-y-2">
          {Object.entries(dataPacket.headers).map(([key, value]) => (
            <div key={key} className="text-xs border-b border-gray-200 pb-1">
              <span className="font-medium text-gray-600">{key}:</span>
              <span className="ml-2 font-mono text-gray-800">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Functions */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">Key Functions</h3>
        <ul className="space-y-2">
          {currentLayer.functions.map((func, index) => (
            <li key={index} className="text-sm flex items-start gap-2">
              <span className="text-green-600 mt-1">✓</span>
              <span>{func}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InfoPanel;
```

---

## **PHASE 4: State Management & Integration** (Days 9-10)

### Step 4.1: Create Simulation Hook

**src/hooks/useSimulation.js:**
```javascript
import { useState, useCallback, useEffect } from 'react';
import { createTransmissionSequence } from '../utils/encapsulation';
import { getLayerById } from '../data/osiLayers';

export const useSimulation = () => {
  const [simulationData, setSimulationData] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState('encapsulation'); // 'encapsulation' or 'decapsulation'
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLayer, setCurrentLayer] = useState(null);
  const [dataPacket, setDataPacket] = useState(null);

  // Start new simulation
  const startSimulation = useCallback((options) => {
    const sequence = createTransmissionSequence(options.message, options);
    setSimulationData(sequence);
    setCurrentStep(0);
    setDirection('encapsulation');
    setIsPlaying(false);
    updateCurrentState(sequence, 0, 'encapsulation');
  }, []);

  // Update current layer and packet info
  const updateCurrentState = (data, step, dir) => {
    if (!data) return;

    const packets = dir === 'encapsulation' ? data.encapsulation : data.decapsulation;
    const currentPacket = packets[step];
    
    if (currentPacket) {
      const layer = getLayerById(currentPacket.layerId);
      setCurrentLayer(layer);
      setDataPacket(currentPacket);
    }
  };

  // Step forward
  const stepForward = useCallback(() => {
    if (!simulationData) return;

    if (direction === 'encapsulation') {
      if (currentStep < simulationData.encapsulation.length - 1) {
        const newStep = currentStep + 1;
        setCurrentStep(newStep);
        updateCurrentState(simulationData, newStep, 'encapsulation');
      } else {
        // Switch to decapsulation
        setDirection('decapsulation');
        setCurrentStep(0);
        updateCurrentState(simulationData, 0, 'decapsulation');
      }
    } else {
      if (currentStep < simulationData.decapsulation.length - 1) {
        const newStep = currentStep + 1;
        setCurrentStep(newStep);
        updateCurrentState(simulationData, newStep, 'decapsulation');
      } else {
        // End of simulation
        setIsPlaying(false);
      }
    }
  }, [simulationData, currentStep, direction]);

  // Step backward
  const stepBack = useCallback(() => {
    if (!simulationData) return;

    if (direction === 'decapsulation') {
      if (currentStep > 0) {
        const newStep = currentStep - 1;
        setCurrentStep(newStep);
        updateCurrentState(simulationData, newStep, 'decapsulation');
      } else {
        // Switch back to encapsulation
        setDirection('encapsulation');
        const lastStep = simulationData.encapsulation.length - 1;
        setCurrentStep(lastStep);
        updateCurrentState(simulationData, lastStep, 'encapsulation');
      }
    } else {
      if (currentStep > 0) {
        const newStep = currentStep - 1;
        setCurrentStep(newStep);
        updateCurrentState(simulationData, newStep, 'encapsulation');
      }
    }
  }, [simulationData, currentStep, direction]);

  // Reset simulation
  const resetSimulation = useCallback(() => {
    setCurrentStep(0);
    setDirection('encapsulation');
    setIsPlaying(false);
    if (simulationData) {
      updateCurrentState(simulationData, 0, 'encapsulation');
    }
  }, [simulationData]);

  // Auto-play
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      stepForward();
    }, 1500); // 1.5 seconds per step

    return () => clearInterval(timer);
  }, [isPlaying, stepForward]);

  return {
    simulationData,
    currentStep,
    direction,
    isPlaying,
    currentLayer,
    dataPacket,
    startSimulation,
    stepForward,
    stepBack,
    resetSimulation,
    setIsPlaying
  };
};
```

---

## **PHASE 5: Final Integration** (Days 11-12)

### Step 5.1: Complete Main App

**src/App.jsx (Final Version):**
```jsx
import { useState } from 'react';
import ControlPanel from './components/ControlPanel/ControlPanel';
import LayerStack from './components/LayerStack/LayerStack';
import InfoPanel from './components/InfoPanel/InfoPanel';
import { useSimulation } from './hooks/useSimulation';
import './App.css';

function App() {
  const {
    simulationData,
    currentStep,
    direction,
    isPlaying,
    currentLayer,
    dataPacket,
    startSimulation,
    stepForward,
    stepBack,
    resetSimulation,
    setIsPlaying
  } = useSimulation();

  const handleLayerClick = (layerId) => {
    console.log('Layer clicked:', layerId);
    // Can add functionality to jump to specific layer
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-indigo-600">
            🌐 Network Protocol Visualizer
          </h1>
          <p className="text-gray-600 mt-2">
            Visualize how data flows through the OSI model layers
          </p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Control Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <ControlPanel
                onStart={startSimulation}
                onReset={resetSimulation}
                onStepForward={stepForward}
                onStepBack={stepBack}
                isPlaying={isPlaying}
                onPause={() => setIsPlaying(false)}
              />
            </div>
          </div>
          
          {/* Visualization Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {simulationData ? (
                <LayerStack
                  currentStep={currentStep}
                  direction={direction}
                  dataPackets={direction === 'encapsulation' 
                    ? simulationData.encapsulation 
                    : simulationData.decapsulation}
                  onLayerClick={handleLayerClick}
                />
              ) : (
                <div className="text-center py-20 text-gray-500">
                  <p className="text-xl mb-2">👈 Enter a message and start transmission</p>
                  <p className="text-sm">Watch how data gets encapsulated through each OSI layer!</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Info Panel */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            {currentLayer ? `Current Layer: ${currentLayer.name}` : 'Information Panel'}
          </h2>
          <InfoPanel
            currentLayer={currentLayer}
            dataPacket={dataPacket}
            direction={direction}
          />
        </div>
      </main>

      <footer className="bg-white mt-12 py-6 border-t">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>Built for Computer Networks Course Project</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
```

---

## **PHASE 6: Testing & Enhancements** (Days 13-14)

### Step 6.1: Testing Checklist

- [ ] Test with different message lengths (short, medium, long)
- [ ] Test all protocol combinations
- [ ] Test animation controls (play, pause, step forward/back)
- [ ] Test responsive design on mobile devices
- [ ] Test layer click interactions
- [ ] Verify header generation for all layers
- [ ] Test encapsulation and decapsulation sequences
- [ ] Check color coding consistency

### Step 6.2: Optional Enhancements

**Add these features for extra credit:**

1. **Preset Scenarios**
```javascript
// src/data/sampleScenarios.js
export const scenarios = [
  {
    name: "Email Transmission",
    message: "Meeting at 3 PM",
    protocol: "SMTP",
    transportProtocol: "TCP"
  },
  {
    name: "Web Request",
    message: "GET /index.html",
    protocol: "HTTP",
    transportProtocol: "TCP"
  },
  {
    name: "DNS Query",
    message: "lookup example.com",
    protocol: "DNS",
    transportProtocol: "UDP"
  }
];
```

2. **Export Functionality**
```javascript
const exportSimulation = () => {
  const data = JSON.stringify(simulationData, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'simulation.json';
  a.click();
};
```

3. **Detailed Statistics**
```jsx
<div className="stats">
  <div>Total Size: {calculateTotalSize()} bytes</div>
  <div>Overhead: {calculateOverhead()}%</div>
  <div>Transmission Time: {calculateTime()} ms</div>
</div>
```

---

## 📦 Deployment

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

### Deploy to GitHub Pages

```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}

# Deploy
npm run deploy
```

### Deploy to Vercel/Netlify

Simply connect your GitHub repo to Vercel or Netlify, and they'll auto-deploy on push.

---

## 📚 Learning Outcomes

After completing this project, you will understand:

✅ OSI Model layer structure and functions  
✅ Encapsulation and decapsulation processes  
✅ Protocol headers at each layer  
✅ How data transforms as it moves through layers  
✅ PDU (Protocol Data Unit) naming conventions  
✅ Practical implementation of networking concepts  
✅ React state management and component architecture  
✅ Animation and visualization techniques  

---

## 🎯 Grading Rubric Alignment

| Criteria | Implementation | Points |
|----------|---------------|---------|
| **Usability** | Intuitive UI, clear controls | 20% |
| **Relatability** | Real-world protocols, familiar scenarios | 20% |
| **Reliability** | Bug-free, consistent behavior | 20% |
| **Efficiency** | Smooth animations, fast rendering | 15% |
| **Technical Implementation** | Clean code, good architecture | 15% |
| **Documentation** | Clear README, comments | 10% |

---

## 🐛 Common Issues & Solutions

### Issue 1: Animation stuttering
**Solution:** Use `requestAnimationFrame` or reduce animation complexity

### Issue 2: Large messages causing layout issues
**Solution:** Implement text truncation with "show more" option

### Issue 3: Mobile responsiveness
**Solution:** Use Tailwind's responsive utilities (`md:`, `lg:` prefixes)

---

## 📖 Additional Resources

- [MDN Web Docs - React](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Computer Networks - Tanenbaum](https://www.pearson.com/en-us/subject-catalog/p/computer-networks/P200000003164)

---

## ✅ Project Completion Checklist

- [ ] Phase 1: Setup complete
- [ ] Phase 2: Data models implemented
- [ ] Phase 3: All UI components created
- [ ] Phase 4: State management working
- [ ] Phase 5: Full integration complete
- [ ] Phase 6: Testing done
- [ ] Documentation written
- [ ] Project deployed
- [ ] Demo video recorded
- [ ] Presentation prepared

---

**Good luck with your project! 🚀**