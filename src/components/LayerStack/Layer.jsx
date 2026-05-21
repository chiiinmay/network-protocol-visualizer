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
