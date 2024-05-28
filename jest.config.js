export default {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
    },
    moduleNameMapper: {
      "\\.(css|less|sass|scss)$": "identity-obj-proxy",
      "^.+\\.svg$": "jest-transformer-svg",
    },
  
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  };