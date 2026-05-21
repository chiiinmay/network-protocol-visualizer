import { useMemo } from 'react';
import { 
  calculateParity, calculate2DParity, calculateChecksum, calculateCRC,
  verifyParity, verify2DParity, verifyChecksum, verifyCRC
} from '../../utils/errorDetection';
import { CheckCircle, XCircle } from 'lucide-react';

const CRC_POLYNOMIAL = '100000111'; // CRC-8 (x^8 + x^2 + x + 1)

const AlgorithmResults = ({ originalData, corruptedData }) => {
  // Helper to split into 8-bit blocks
  const getBlocks = (data) => {
    const blocks = [];
    for (let i = 0; i < data.length; i += 8) {
      blocks.push(data.slice(i, i + 8).padEnd(8, '0'));
    }
    return blocks;
  };

  const results = useMemo(() => {
    if (!originalData || !corruptedData) return null;

    const originalBlocks = getBlocks(originalData);
    const corruptedBlocks = getBlocks(corruptedData);
    const hasError = originalData !== corruptedData;

    // 1D Parity (Even)
    const originalParity = calculateParity(originalData);
    const isParityValid = verifyParity(corruptedData + originalParity);
    
    // 2D Parity
    const { rowParities: origRowP, colParities: origColP } = calculate2DParity(originalBlocks);
    const is2DParityValid = verify2DParity(corruptedBlocks, origRowP, origColP);

    // Checksum
    const originalChecksum = calculateChecksum(originalBlocks);
    const isChecksumValid = verifyChecksum(corruptedBlocks, originalChecksum);

    // CRC
    const originalCRC = calculateCRC(originalData, CRC_POLYNOMIAL);
    const isCRCValid = verifyCRC(corruptedData, originalCRC, CRC_POLYNOMIAL);

    return [
      {
        name: '1D Parity (Even)',
        description: 'Counts total 1s. Fails if an even number of bits are flipped.',
        checkBits: originalParity,
        detectedError: hasError && !isParityValid,
        isValid: isParityValid,
        falseNegative: hasError && isParityValid
      },
      {
        name: '2D Parity (Block)',
        description: 'Row and column parity. Can catch all 1, 2, 3 bit errors.',
        checkBits: `Row: ${origRowP}, Col: ${origColP}`,
        detectedError: hasError && !is2DParityValid,
        isValid: is2DParityValid,
        falseNegative: hasError && is2DParityValid
      },
      {
        name: 'Checksum (8-bit)',
        description: 'Sum of data words. Used in IP/TCP.',
        checkBits: originalChecksum,
        detectedError: hasError && !isChecksumValid,
        isValid: isChecksumValid,
        falseNegative: hasError && isChecksumValid
      },
      {
        name: 'CRC (CRC-8)',
        description: `Polynomial division using ${CRC_POLYNOMIAL}. Highly robust.`,
        checkBits: originalCRC,
        detectedError: hasError && !isCRCValid,
        isValid: isCRCValid,
        falseNegative: hasError && isCRCValid
      }
    ];
  }, [originalData, corruptedData]);

  if (!results) return null;
  const hasError = originalData !== corruptedData;

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">3. Algorithm Performance</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((algo, idx) => (
          <div key={idx} className={`border rounded-lg p-4 ${algo.falseNegative ? 'bg-red-50 border-red-200' : 'bg-gray-50'}`}>
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold">{algo.name}</h4>
              {hasError ? (
                algo.detectedError ? (
                  <span className="flex items-center text-green-600 text-sm font-medium"><CheckCircle className="w-4 h-4 mr-1"/> Error Caught</span>
                ) : (
                  <span className="flex items-center text-red-600 text-sm font-medium"><XCircle className="w-4 h-4 mr-1"/> Error Missed!</span>
                )
              ) : (
                <span className="text-gray-500 text-sm">No Errors</span>
              )}
            </div>
            <p className="text-xs text-gray-600 mb-3">{algo.description}</p>
            <div className="text-sm">
              <span className="font-medium text-gray-700">Check Bits Calculated: </span>
              <span className="font-mono bg-white px-2 py-1 rounded border text-xs">{algo.checkBits}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmResults;
