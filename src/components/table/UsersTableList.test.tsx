import { render, screen } from "@testing-library/react";
import { UsersTableList } from "./UsersTableList";

describe ('UsersTableList', () => {
  test('renders correctly', () => {
    render(<UsersTableList/>)
    const buttonElement = screen.getByRole('heading', {level:1 })
    expect(buttonElement).toBeInTheDocument()
  })
})
