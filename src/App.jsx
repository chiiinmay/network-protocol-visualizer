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
