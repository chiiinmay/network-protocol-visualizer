# 🌐 Network Protocol Visualizer & Simulator

An interactive web application that visualizes data flow through OSI model layers with encapsulation/decapsulation animation — plus an Error Detection & Correction Playground.

## 🚀 Live Demo

| Link | URL |
|------|-----|
| 🌐 **Live App (Vercel)** | [network-protocol-visualizer.vercel.app](https://network-protocol-visualizer.vercel.app) |
| 💻 **GitHub Repository** | [github.com/chiiinmay/network-protocol-visualizer](https://github.com/chiiinmay/network-protocol-visualizer) |

---

## 🎯 Features

### 📡 OSI Model Simulator
- Interactive **7-layer OSI model** visualization
- **Message input** and transmission simulation
- Step-by-step **Encapsulation** (adding headers, Layer 7 → 1)
- Step-by-step **Decapsulation** (removing headers, Layer 1 → 7)
- **Color-coded** representation for each layer
- **Animation controls**: Play, Pause, Step Forward, Step Back
- **Protocol selection**: HTTP, HTTPS, FTP, SMTP + TCP/UDP
- **Info panel**: Live header fields and layer details

### 🔬 Error Detection & Correction Playground
- **Educational context**: "How does my USB drive know my file got corrupted?"
- Enter binary data and see check bits calculated in real-time
- **Interactive bit-flip injector** — click any bit to simulate corruption
- **4 algorithms compared side-by-side**:
  - 1D Parity (Even/Odd)
  - 2D Parity (Block Coding)
  - Checksum (8-bit, IP/TCP style)
  - CRC-8 (Cyclic Redundancy Check)
- See which algorithms **catch** or **miss** your injected errors

---

## 🏗️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | Component-based UI |
| **Vite** | Fast dev server & build tool |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Smooth animations |
| **Lucide React** | Icons |
| **Vercel** | Deployment & hosting |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ControlPanel/      # Message input + playback controls
│   ├── LayerStack/        # OSI layer visualization
│   ├── InfoPanel/         # Live header & layer info
│   └── ErrorPlayground/   # Error detection feature
│       ├── DataInput.jsx
│       ├── ErrorInjector.jsx
│       └── AlgorithmResults.jsx
├── data/
│   └── osiLayers.js       # OSI layer definitions
├── hooks/
│   └── useSimulation.js   # Simulation state management
└── utils/
    ├── encapsulation.js   # Encapsulation/Decapsulation logic
    ├── protocolHeaders.js # Protocol header generation
    └── errorDetection.js  # Parity, Checksum, CRC algorithms
```

---

## 🧠 Topics Covered

- OSI Model (7 Layers)
- Data Encapsulation & Decapsulation
- Protocol Headers (HTTP, TCP, IP, Ethernet, Physical)
- Block Coding & Parity
- Checksum (1's complement)
- Cyclic Redundancy Check (CRC)

---

## 📦 Run Locally

```bash
git clone https://github.com/chiiinmay/network-protocol-visualizer
cd network-protocol-visualizer
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

Built for Computer Networks Course 🎓
