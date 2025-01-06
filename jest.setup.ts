import "@testing-library/jest-dom";

jest.mock("use-local-storage-state", () => {
  return {
    __esModule: true,
    default: jest.fn(() => [[], jest.fn()]),
  };
});
