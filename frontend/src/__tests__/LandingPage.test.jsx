import LandingPage from "../components/pages/LandingPage";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("LandingPage component", () => {
  it("renders correct p", () => {
    render(<LandingPage />);
    expect(
      screen.getByText(
        "For full access please login or signup. There is the option to use a sample account when signing up."
      )
    );
  });
});

// For full access please login or signup. There is the option to use a sample account when signing up.
