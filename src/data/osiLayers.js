export const OSI_LAYERS = [
  {
    id: 7,
    name: "Application Layer",
    shortName: "Application",
    color: "#FF6B6B",
    bgColor: "#FFE5E5",
    protocols: ["HTTP", "HTTPS", "FTP", "SMTP", "DNS"],
    description: "Provides network services directly to end-user applications",
    pdu: "Data",
    functions: [
      "Resource sharing",
      "Remote file access",
      "Network virtual terminal",
      "Email services"
    ],
    headerFields: ["Method", "URL", "Headers", "Cookies"]
  },
  {
    id: 6,
    name: "Presentation Layer",
    shortName: "Presentation",
    color: "#4ECDC4",
    bgColor: "#E5F9F7",
    protocols: ["SSL/TLS", "JPEG", "MPEG", "ASCII"],
    description: "Translates data formats, encryption, and compression",
    pdu: "Data",
    functions: [
      "Data encryption/decryption",
      "Data compression",
      "Data translation",
      "Format conversion"
    ],
    headerFields: ["Encoding", "Compression", "Encryption"]
  },
  {
    id: 5,
    name: "Session Layer",
    shortName: "Session",
    color: "#45B7D1",
    bgColor: "#E5F4F9",
    protocols: ["NetBIOS", "RPC", "PPTP"],
    description: "Manages sessions and controls dialogs between computers",
    pdu: "Data",
    functions: [
      "Session establishment",
      "Session maintenance",
      "Session termination",
      "Synchronization"
    ],
    headerFields: ["Session ID", "Sequence Number"]
  },
  {
    id: 4,
    name: "Transport Layer",
    shortName: "Transport",
    color: "#FFA07A",
    bgColor: "#FFEEE8",
    protocols: ["TCP", "UDP"],
    description: "Provides reliable data transfer services",
    pdu: "Segment (TCP) / Datagram (UDP)",
    functions: [
      "Segmentation",
      "Flow control",
      "Error control",
      "Port addressing"
    ],
    headerFields: ["Source Port", "Dest Port", "Sequence #", "ACK #", "Checksum"]
  },
  {
    id: 3,
    name: "Network Layer",
    shortName: "Network",
    color: "#98D8C8",
    bgColor: "#E8F7F3",
    protocols: ["IP", "ICMP", "ARP", "IGMP"],
    description: "Routes packets across networks using logical addresses",
    pdu: "Packet",
    functions: [
      "Logical addressing",
      "Routing",
      "Path determination",
      "Packet forwarding"
    ],
    headerFields: ["Source IP", "Dest IP", "TTL", "Protocol", "Checksum"]
  },
  {
    id: 2,
    name: "Data Link Layer",
    shortName: "Data Link",
    color: "#F7DC6F",
    bgColor: "#FEF9E7",
    protocols: ["Ethernet", "PPP", "HDLC", "Frame Relay"],
    description: "Provides node-to-node data transfer and error detection",
    pdu: "Frame",
    functions: [
      "Framing",
      "Physical addressing (MAC)",
      "Error detection",
      "Flow control"
    ],
    headerFields: ["Source MAC", "Dest MAC", "Frame Type", "FCS"]
  },
  {
    id: 1,
    name: "Physical Layer",
    shortName: "Physical",
    color: "#BB8FCE",
    bgColor: "#F4ECF7",
    protocols: ["Ethernet Physical", "USB", "Bluetooth", "DSL"],
    description: "Transmits raw bit stream over physical medium",
    pdu: "Bits",
    functions: [
      "Bit synchronization",
      "Transmission mode",
      "Physical topology",
      "Signal encoding"
    ],
    headerFields: ["Preamble", "Start Frame Delimiter"]
  }
];

export const getLayerById = (id) => {
  return OSI_LAYERS.find(layer => layer.id === id);
};

export const getLayerByName = (name) => {
  return OSI_LAYERS.find(layer => 
    layer.name.toLowerCase() === name.toLowerCase() ||
    layer.shortName.toLowerCase() === name.toLowerCase()
  );
};
