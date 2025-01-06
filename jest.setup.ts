import "@testing-library/jest-dom";

jest.mock("use-local-storage-state", () => {
  return {
    __esModule: true,
    default: jest.fn(() => [[], jest.fn()]),
  };
});

jest.mock("react-error-boundary", () => ({
  __esModule: true,
  useErrorBoundary: jest.fn(() => ({
    showBoundary: jest.fn(),
  })),
}));
