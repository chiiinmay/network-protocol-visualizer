import { useState, useEffect } from 'react';
import DataInput from './DataInput';
import ErrorInjector from './ErrorInjector';
import AlgorithmResults from './AlgorithmResults';
import { HardDrive } from 'lucide-react';

const ErrorPlayground = () => {
  const [originalData, setOriginalData] = useState('1101001110110000');
  const [corruptedData, setCorruptedData] = useState('1101001110110000');

  // When original data changes, reset corrupted data to match
  useEffect(() => {
    // Pad or trim data to multiple of 8 bits for checksum/2D parity compatibility
    let formattedData = originalData;
    if (formattedData.length === 0) formattedData = '00000000';
    if (formattedData.length % 8 !== 0) {
       // Just let it be for now, algorithms handle padding or we just warn user
    }
    setCorruptedData(originalData);
  }, [originalData]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Educational Context */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
        <div className="flex items-start gap-3">
          <HardDrive className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h2 className="text-lg font-bold text-blue-800">How does my USB drive know my file got corrupted?</h2>
            <p className="text-sm text-blue-900 mt-1">
              When you save a file to a USB drive or download an image from the web, hardware glitches, cosmic rays, or bad cables can flip a <code className="bg-blue-100 px-1 rounded">0</code> to a <code className="bg-blue-100 px-1 rounded">1</code>. 
              To detect this, systems calculate <strong>check bits</strong> (extra math data) and attach them to your file. When reading the file back, it recalculates the check bits. If they don't match, it knows the file is corrupted!
            </p>
          </div>
        </div>
      </div>

      <DataInput data={originalData} setData={setOriginalData} />
      
      {originalData.length > 0 && (
        <>
          <ErrorInjector 
            originalData={originalData}
            corruptedData={corruptedData}
            setCorruptedData={setCorruptedData}
          />
          
          <AlgorithmResults 
            originalData={originalData}
            corruptedData={corruptedData}
          />
        </>
      )}
    </div>
  );
};

export default ErrorPlayground;
