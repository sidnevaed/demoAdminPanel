import { render, screen } from "@testing-library/react";
import { AppWithStore } from "./App";
import React from "react";

test("renders learn react link", () => {
  render(<AppWithStore />);
  const linkElement = screen.getByText('Панель администратора мобильной игры');
  expect(linkElement).toBeInTheDocument();

  // href
  // Click on Href
  // Fill login/password
  // Enter login
  //

  const button = screen.getByText('Если хотите ознакомиться с содержанием, пройдите авторизацию')
  button.click();
});
