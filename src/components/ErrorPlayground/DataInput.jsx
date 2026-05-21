import { useState } from 'react';

const DataInput = ({ data, setData }) => {
  const handleBinaryChange = (e) => {
    const val = e.target.value.replace(/[^01]/g, '');
    setData(val);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-semibold mb-2">1. Original Data</h3>
      <p className="text-sm text-gray-600 mb-4">Enter a binary string to transmit (e.g., 16 bits).</p>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Binary Data
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 font-mono tracking-widest text-lg"
          value={data}
          onChange={handleBinaryChange}
          placeholder="1101001110110000"
          maxLength={32}
        />
        <p className="text-xs text-gray-500 mt-2 text-right">
          Length: {data.length} bits
        </p>
      </div>
    </div>
  );
};

export default DataInput;
