import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
// import fetchMock from "jest-fetch-mock";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

// fetchMock.enableMocks();
