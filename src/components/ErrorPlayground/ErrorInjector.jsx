import { motion } from 'framer-motion';

const ErrorInjector = ({ corruptedData, setCorruptedData, originalData }) => {
  const toggleBit = (index) => {
    const newData = corruptedData.split('');
    newData[index] = newData[index] === '1' ? '0' : '1';
    setCorruptedData(newData.join(''));
  };

  const resetErrors = () => {
    setCorruptedData(originalData);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold">2. Introduce Errors (The "Noise")</h3>
          <p className="text-sm text-gray-600">Click on any bit to flip it and simulate data corruption.</p>
        </div>
        <button 
          onClick={resetErrors}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium transition-colors"
        >
          Reset
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-4">
        {corruptedData.split('').map((bit, index) => {
          const isFlipped = originalData[index] !== bit;
          return (
            <motion.button
              key={index}
              onClick={() => toggleBit(index)}
              className={`w-10 h-10 flex items-center justify-center font-mono text-lg font-bold rounded-md shadow-sm border-2 transition-colors ${
                isFlipped 
                  ? 'bg-red-500 border-red-600 text-white' 
                  : 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100'
              }`}
              whileTap={{ scale: 0.9 }}
              animate={isFlipped ? { y: [0, -5, 0] } : {}}
            >
              {bit}
            </motion.button>
          );
        })}
      </div>
      
      <div className="mt-4 flex gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-50 border-2 border-gray-200 rounded-sm"></div>
          <span>Original Bit</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500 border-2 border-red-600 rounded-sm"></div>
          <span>Corrupted Bit</span>
        </div>
      </div>
    </div>
  );
};

export default ErrorInjector;
