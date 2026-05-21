// Utility functions for Error Detection algorithms

export const calculateParity = (binaryString, type = 'even') => {
  const count1s = (binaryString.match(/1/g) || []).length;
  if (type === 'even') {
    return count1s % 2 === 0 ? '0' : '1';
  } else {
    return count1s % 2 === 0 ? '1' : '0';
  }
};

export const calculate2DParity = (binaryBlocks, type = 'even') => {
  // Assuming binaryBlocks is an array of 8-bit strings
  const rowParities = binaryBlocks.map(block => calculateParity(block, type));
  
  let colParities = '';
  const blockLength = binaryBlocks[0].length;
  
  for (let i = 0; i < blockLength; i++) {
    let colString = '';
    for (let j = 0; j < binaryBlocks.length; j++) {
      colString += binaryBlocks[j][i];
    }
    colParities += calculateParity(colString, type);
  }
  
  return { rowParities, colParities };
};

export const calculateChecksum = (binaryBlocks) => {
  // Summing blocks as 8-bit integers
  let sum = 0;
  binaryBlocks.forEach(block => {
    sum += parseInt(block, 2);
  });
  
  // Handle carry (wrap around)
  while (sum > 255) {
    sum = (sum & 0xFF) + (sum >> 8);
  }
  
  // 1's complement
  const checksum = (~sum & 0xFF).toString(2).padStart(8, '0');
  return checksum;
};

// Simple CRC modulo-2 division
export const calculateCRC = (data, generator) => {
  let paddedData = data + '0'.repeat(generator.length - 1);
  let dataArr = paddedData.split('');
  const genArr = generator.split('');
  
  for (let i = 0; i <= dataArr.length - genArr.length; i++) {
    if (dataArr[i] === '1') {
      for (let j = 0; j < genArr.length; j++) {
        dataArr[i + j] = dataArr[i + j] === genArr[j] ? '0' : '1';
      }
    }
  }
  
  return dataArr.slice(-(generator.length - 1)).join('');
};

// Verification functions
export const verifyParity = (dataWithParity, type = 'even') => {
  return calculateParity(dataWithParity, type) === '0';
};

export const verify2DParity = (binaryBlocks, originalRowParities, originalColParities, type = 'even') => {
  const { rowParities, colParities } = calculate2DParity(binaryBlocks, type);
  return rowParities === originalRowParities && colParities === originalColParities;
};

export const verifyChecksum = (binaryBlocks, receivedChecksum) => {
  let sum = 0;
  binaryBlocks.forEach(block => {
    sum += parseInt(block, 2);
  });
  sum += parseInt(receivedChecksum, 2);
  
  while (sum > 255) {
    sum = (sum & 0xFF) + (sum >> 8);
  }
  
  return (~sum & 0xFF) === 0;
};

export const verifyCRC = (data, receivedRemainder, generator) => {
  const remainder = calculateCRC(data + receivedRemainder, generator);
  return parseInt(remainder, 2) === 0;
};
