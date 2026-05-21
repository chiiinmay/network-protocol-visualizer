export const generateHeaders = (layerId, message, options = {}) => {
  const headers = {};
  
  switch(layerId) {
    case 7: // Application Layer
      headers.protocol = options.protocol || "HTTP";
      headers.method = "GET";
      headers.url = "/data";
      headers.version = "HTTP/1.1";
      headers.contentType = "text/plain";
      headers.contentLength = message.length;
      break;
      
    case 6: // Presentation Layer
      headers.encoding = "UTF-8";
      headers.compression = options.compression || "none";
      headers.encryption = options.encryption || "none";
      break;
      
    case 5: // Session Layer
      headers.sessionId = generateSessionId();
      headers.sequenceNumber = 1;
      headers.timestamp = Date.now();
      break;
      
    case 4: // Transport Layer
      headers.protocol = options.transportProtocol || "TCP";
      headers.sourcePort = 12345;
      headers.destPort = 80;
      headers.sequenceNumber = Math.floor(Math.random() * 1000000);
      headers.ackNumber = 0;
      headers.flags = "SYN";
      headers.windowSize = 65535;
      headers.checksum = calculateChecksum(message);
      break;
      
    case 3: // Network Layer
      headers.protocol = "IPv4";
      headers.sourceIP = options.sourceIP || "192.168.1.100";
      headers.destIP = options.destIP || "192.168.1.1";
      headers.version = 4;
      headers.ttl = 64;
      headers.protocol = "TCP";
      headers.checksum = calculateChecksum(message);
      break;
      
    case 2: // Data Link Layer
      headers.protocol = "Ethernet";
      headers.sourceMAC = options.sourceMAC || "00:1A:2B:3C:4D:5E";
      headers.destMAC = options.destMAC || "00:1A:2B:3C:4D:5F";
      headers.etherType = "0x0800"; // IPv4
      headers.fcs = calculateFCS(message);
      break;
      
    case 1: // Physical Layer
      headers.preamble = "10101010".repeat(7);
      headers.sfd = "10101011"; // Start Frame Delimiter
      headers.encoding = "Manchester";
      break;
      
    default:
      break;
  }
  
  return headers;
};

const generateSessionId = () => {
  return Math.random().toString(36).substr(2, 9).toUpperCase();
};

const calculateChecksum = (data) => {
  // Simple checksum calculation (sum of character codes mod 65536)
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data.charCodeAt(i);
  }
  return (sum % 65536).toString(16).toUpperCase().padStart(4, '0');
};

const calculateFCS = (data) => {
  // Frame Check Sequence (simple CRC simulation)
  return calculateChecksum(data);
};

export const formatHeaderForDisplay = (headers) => {
  return Object.entries(headers).map(([key, value]) => ({
    field: key.replace(/([A-Z])/g, ' $1').trim(),
    value: value.toString()
  }));
};
