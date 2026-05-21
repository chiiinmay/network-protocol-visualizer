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
    setIsPlaying(true);
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
