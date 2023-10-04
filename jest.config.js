module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Adding Babel transformer
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js", // Adjust the path
  },
  testPathIgnorePatterns: ["/node_modules/", "/.next/"], // Ignoring node_modules and .next folder
  transformIgnorePatterns: ["/node_modules/"], // This is essential to ensure that node_modules are not transformed
};
