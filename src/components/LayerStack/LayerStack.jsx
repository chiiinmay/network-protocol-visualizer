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
