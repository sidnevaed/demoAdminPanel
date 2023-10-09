import { render, screen } from "@testing-library/react";
import { AppWithStore } from "./App";
import React from "react";
import user from '@testing-library/user-event'
import { act } from "react-dom/test-utils";

describe('App component' , () => {
  test("HomePage renders correctly", () => {
    render(<AppWithStore />);
    const pageHeading = screen.getByRole("heading", { level: 1 });
    expect(pageHeading).toBeInTheDocument();
  })

  test('user clicks on a link to authorization and goes to SignIn path', async () => {
    user.setup()
    render(<AppWithStore />);
    const linkElement = screen.getByText("Если хотите ознакомиться с содержанием, пройдите авторизацию");
    expect(linkElement).toBeInTheDocument();
    await act(async () => {
      await user.click(linkElement);
    });
    const authElement = screen.getByRole('heading', { name: "Авторизуйтесь" })
    expect(authElement).toBeInTheDocument();
  })

  test('user fills in an authorization form', async () => {
    user.setup()
    render(<AppWithStore />);
    const emailAuthInput = screen.getByPlaceholderText("Email");
    await act(async () => {
      await user.type(emailAuthInput, 'K@K.mail');
    })
    expect(emailAuthInput).toHaveValue('K@K.mail');

    const passwordAuthInput = screen.getByPlaceholderText("Пароль");
    await act(async () => {
      await user.type(passwordAuthInput, '12345');
    })
    expect(passwordAuthInput).toHaveValue('12345');
  })

  test('user clicks on a link to registration and goes to Registration path', async () => {
    user.setup()
    render(<AppWithStore />);
    const linkRegElement = screen.getByText("Зарегистрируйтесь");
    expect(linkRegElement).toBeInTheDocument();
    await act(async() => {
      await user.click(linkRegElement);
    });

    const registerElement = screen.getByRole('heading', {name: "Форма для регистрации"})
    expect(registerElement).toBeInTheDocument();

  })


});
