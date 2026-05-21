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
            <div key={key} className="text-xs border-b border-gray-200 pb-1 flex justify-between">
              <span className="font-medium text-gray-600">{key}:</span>
              <span className="ml-2 font-mono text-gray-800 break-all text-right">{value}</span>
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
              <span className="text-green-600 mt-0.5">✓</span>
              <span>{func}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InfoPanel;
