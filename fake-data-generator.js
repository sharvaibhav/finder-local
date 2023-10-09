const fs = require("fs");
const faker = require("faker");

const getRandomDateBetween = (
  startDay,
  startMonth,
  startYear,
  endDay,
  endMonth,
  endYear
) => {
  const startDate = new Date(startYear, startMonth - 1, startDay); // Month in Date starts from 0 (January is 0)
  const endDate = new Date(endYear, endMonth - 1, endDay);

  // Calculate the difference in milliseconds between start and end dates
  const timeDiff = endDate.getTime() - startDate.getTime();

  // Generate a random time duration between the two dates
  const randomTimeDiff = faker.datatype.number(timeDiff);

  // Calculate the random date by adding the random time duration to the start date
  const randomDate = new Date(startDate.getTime() + randomTimeDiff);

  return randomDate;
};

const generatePhrase = () => {
  // Generate a random number of words between 4 and 8
  const numWords = Math.floor(Math.random() * 5) + 4;
  return faker.lorem.words(numWords);
};

const generateDummyData = (count) => {
  const currentMonth = new Date().getMonth() + 1;
  const startDate = `${faker.datatype.number({
    min: 10,
    max: 20,
  })} ${faker.datatype.number({ min: currentMonth, max: currentMonth })} 2023`; // dd mm yyyy
  const endDate = `${faker.datatype.number({
    min: 21,
    max: 29,
  })} ${faker.datatype.number({
    min: currentMonth,
    max: currentMonth + 1,
  })} 2023`;

  const [startDay, startMonth, startYear] = startDate.split(" ").map(Number);
  const [endDay, endMonth, endYear] = endDate.split(" ").map(Number);

  const dummyDataArray = [];

  for (let i = 0; i < count; i++) {
    const dummyData = {
      DESCRIPTION: generatePhrase(),
      "SET POINT HIGH HIGH": faker.datatype.float({ min: 150, max: 170 }),
      "EXTERNAL SYSTEM ID": faker.datatype.uuid(),
      "ISSUED BY": faker.random.arrayElement([
        "Vaibhav",
        "Ole",
        "Haakon",
        "Samit",
        "Dilanka",
        "Michael",
        "Lisa",
        "Linda",
        "Peter",
        "Nopmanee",
      ]),
      OWNER: faker.random.arrayElement([
        "Person A",
        "Person B",
        "Person C",
        "Person D",
      ]),
      "SAP OBJECT TYPE": faker.random.arrayElement([
        "IP-TIUT",
        "IP-KJPT",
        "IP-IOFT",
      ]),
      "HAZARDOUS ATEX MARKING": faker.random.arrayElement([
        "II 1 G",
        "II 2 G",
        "II 3 G",
        "II 4 F",
        "II 6 HJ",
        "II 9 GIJO",
        "II 39 OI",
        "II 12 oiu",
      ]),
      "PART NUMBER": faker.random.alphaNumeric(10),
      SOURCE: faker.random.arrayElement(["aveva", "sap", "external", "ION"]),
      "CALIBRATED RANGE MAX_UOM": faker.random.arrayElement([
        "oC",
        "oF",
        "PoC",
      ]),
      "SERIAL NUMBER": faker.datatype.uuid(),
      "SIGNAL TYPE": faker.random.arrayElement(["4-20mA", "0-10V", "Modbus"]),
      "HAZARDOUS CERT NUMBER": faker.random.alphaNumeric(12),
      "CREATED TIME": getRandomDateBetween(
        startDay,
        startMonth,
        startYear,
        endDay,
        endMonth,
        endYear
      ).toISOString(),
      "SUPPLY CODE": faker.random.arrayElement(["NA", "EU", "ASIA"]),
      id: faker.datatype.number({ min: 8000000, max: 9000000 }),
      "WEIGHT (DRY)": faker.datatype.float({ min: 2.0, max: 19.0 }),
      "MODEL NUMBER": faker.random.alphaNumeric(7),
      "I/O TYPE": faker.random.arrayElement(["AI", "AO", "DI", "DO"]),
      SYSTEM: faker.random.arrayElement([
        "11: Crane and fabrication",
        "22: Sanitation Disposal system",
        "21: CRUDE HANDLING AND METERING",
        "22: GAS PROCESSING",
        "23: UTILITIES",
        "44: Some other sys",
        "77: Ventisjon Sys",
        "31: Sub mechanical Sys",
        "32: Material uploading Sys",
        "33: Gas Filteration Sys",
        "34: Super Spilling  Sys",
      ]),
      DISCIPLINE: faker.random.arrayElement([
        "A: Assemply and Installation",
        "B: Biomarine and sanity",
        "C: Crane and material",
        "D: Gas and toxic substance",
        "E: Electrical",
        "F: Facility handling",
        "G: Gaseous sabstances",
        "I: Industrial equipments",
        "J: Jagan and magan",
      ]),
      "HAZARDOUS TEMP RATING": faker.random.arrayElement(["T6", "T5", "T4"]),
      "PARENT TAG": faker.random.arrayElement([
        "65SDE54",
        "09VGTDE54",
        "12HUIBG",
        "23YBHYTYY",
        "N-23YBHYTYY",
        "U-UIY675NHY",
        "U-876GCDE",
        "53TYREY",
        "87IUYYT",
        "23YUNUT",
        "IUY654",
        "D-UY67TR",
        "IUYT87DR",
        "OIU67REW",
        "IUY7612",
        "87UIBHG4",
        "32OMBH98",
        "21MJH567",
        "21UIVF71",
      ]),
      flocSystemId: faker.datatype.number({ min: 23, max: 100 }),
      "SET POINT HIGH": faker.random.arrayElement(["oC", "oF", "oL", "iY"]),
      "FUNCTIONAL LOCATION": faker.random.arrayElement([
        "T100IU",
        "26Y998UY",
        "41Y99TYY",
        "53TYREY",
        "87IUYYT",
        "23YUNUT",
        "IUY654",
        "D-UY67TR",
        "IUYT87DR",
        "OIU67REW",
        "IUY7612",
        "87UIBHG4",
        "32OMBH98",
        "21MJH567",
        "21UIVF71",
      ]),
      "SAP CATALOG PROFILE": faker.random.alphaNumeric(8),
      "FIRE AREA": faker.random.alphaNumeric(4),
      "CALIBRATED RANGE MAX": faker.datatype.float({ min: 180, max: 220 }),
      "LAST MAINTENANCE DATE": getRandomDateBetween(
        startDay,
        startMonth,
        startYear,
        endDay,
        endMonth,
        endYear
      ).toISOString(),
      "CALIBRATION DATE": getRandomDateBetween(
        startDay,
        startMonth,
        startYear,
        endDay,
        endMonth,
        endYear
      ).toISOString(),
      "INSPECTION DATE": getRandomDateBetween(
        startDay,
        startMonth,
        startYear,
        endDay,
        endMonth,
        endYear
      ).toISOString(),
    };
    dummyDataArray.push(dummyData);
  }

  return dummyDataArray;
};

const dummyDataArray = generateDummyData(1000); // Change the count to the desired number of dummy data documents

const jsonData = JSON.stringify(dummyDataArray, null, 2);
fs.writeFileSync("dummy_data.json", jsonData);
console.log("Dummy data has been saved to dummy_data.json");
