export const sampleMeta = {
  Owner: {
    dataType: "string",
    values: ["Person D", "Person B", "Person C", "Person A"],
  },
};

export const sampleMeta2 = {
  "SAP OBJECT TYPE": {
    dataType: "string",
    values: ["IP-IOFT", "IP-KJPT", "IP-TIUT"],
  },
  "HAZARDOUS ATEX MARKING": {
    dataType: "string",
    values: [
      "II 6 HJ",
      "II 12 oiu",
      "II 4 F",
      "II 9 GIJO",
      "II 2 G",
      "II 3 G",
      "II 39 OI",
      "II 1 G",
    ],
  },
  source: {
    dataType: "string",
    values: ["sap", "aveva", "ION", "external"],
  },
  "CALIBRATED RANGE MAX_UOM": {
    dataType: "string",
    values: ["oC", "PoC", "oF"],
  },
  "SIGNAL TYPE": {
    dataType: "string",
    values: ["Modbus", "4-20mA", "0-10V"],
  },
  createdTime: {
    dataType: "date",
    values: [
      1697735379263, 1697816776580, 1697370814324, 1697743291805, 1697520265860,
    ],
  },
  "HAZARDOUS AREA CLASSIFICATION": {
    dataType: "string",
    values: ["Zone 1", "Zone 2", "Zone 0"],
  },
};
