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
