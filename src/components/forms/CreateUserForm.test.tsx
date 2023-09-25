import { render, screen } from "@testing-library/react";
import { CreateUserForm } from "./CreateUserForm";
import { HomePage } from "../../pages/HomePage";

test("HomePage renders", () => {
  render(<CreateUserForm />);
  const pageHeading = screen.getByRole("heading", { level: 1 });
  expect(pageHeading).toBeInTheDocument();
});
