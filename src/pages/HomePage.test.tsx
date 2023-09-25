import { render, screen } from "@testing-library/react";
import { HomePage } from "./HomePage";

test("HomePage renders", () => {
  render(<HomePage />);
  const pageHeading = screen.getByRole("heading", { level: 1 });
  expect(pageHeading).toBeInTheDocument();
});
