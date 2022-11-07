import { screen, fireEvent, render } from '@testing-library/react'
import {LoginView} from '@/components/LoginView'

describe("LoginView", () => {
  it("Renders Correctly", () => {
    const component = render(<LoginView/>)
    
    const emailInput = component.getByTestId("email-input")
    const passwordInput = component.getByTestId("password-input")

    fireEvent.change(emailInput, {target: {value: "email@email.com"}})
    fireEvent.change(passwordInput, {target: {value: "123456"}})

    expect(screen.getByDisplayValue("email@email.com")).toBeInTheDocument()
    expect(screen.getByDisplayValue("123456")).toBeInTheDocument()

  })
})