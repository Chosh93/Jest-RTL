import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders hello message", () => {
  render(<App />);
  expect(
    screen.getByText(/hello, react with typescript!/i)
  ).toBeInTheDocument();
});