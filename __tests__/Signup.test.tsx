import { screen, fireEvent, render, waitFor } from '@testing-library/react'
import SignupView from '@/pages/Signup'
import { act } from 'react-dom/test-utils'

describe("SignUp", () => {
  it("Forms validates correctly", async () => {
    const component = render(<SignupView />)

    const name = component.getByTestId("name-input")
    const username = component.getByTestId("username-input")
    const emailInput = component.getByTestId("email-input")
    const passwordInput = component.getByTestId("password-input")
    const buttonSubmit = component.getByTestId("button-submit")

    act(() => {
      fireEvent.change(name, { target: { value: "Name too big 1234567" } })
      fireEvent.change(username, { target: { value: "123456789characterstoobig" } })
      fireEvent.change(emailInput, { target: { value: "email" } })
      fireEvent.change(passwordInput, { target: { value: "1234" } })
      fireEvent.click(buttonSubmit)
    })
    await waitFor(() => {
      expect(buttonSubmit).toBeDisabled()
      expect(screen.getByDisplayValue("123456789characterstoobig")).toBeInTheDocument()

      expect(screen.getByText("Name is too big")).toBeInTheDocument()
      expect(screen.getByText("Username is too big")).toBeInTheDocument()
      expect(screen.getByText("Invalid email")).toBeInTheDocument()
      expect(screen.getByText("Password must be at least 5 characters")).toBeInTheDocument()
    })

    act(() => {
      fireEvent.change(name, { target: { value: "name ok" } })
      fireEvent.change(username, { target: { value: "username ok" } })
      fireEvent.change(emailInput, { target: { value: "email@valid.com" } })
      fireEvent.change(passwordInput, { target: { value: "123456" } })
      fireEvent.click(buttonSubmit)
    })

    await waitFor(() => {
      expect(buttonSubmit).toBeEnabled()
      expect(screen.getByDisplayValue("email@valid.com")).toBeInTheDocument()

      expect(() => screen.getByText('Name is too big')).toThrow('Unable to find an element')
      expect(() => screen.getByText('Username is too big')).toThrow('Unable to find an element')
      expect(() => screen.getByText('Invalid email')).toThrow('Unable to find an element')
      expect(() => screen.getByText('Password must be at least 5 characters')).toThrow('Unable to find an element')
    })
  })
})
