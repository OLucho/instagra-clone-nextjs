import { screen, fireEvent, render, waitFor } from '@testing-library/react'
import { LoginView } from '@/components/LoginView'
import { act } from 'react-dom/test-utils'

describe("LoginView", () => {
  it("Forms validates correctly", async () => {
    const component = render(<LoginView />)

    const emailInput = component.getByTestId("email-input")
    const passwordInput = component.getByTestId("password-input")
    const buttonSubmit = component.getByTestId("button-submit")

    act(() => {
      fireEvent.change(emailInput, { target: { value: "email" } })
      fireEvent.change(passwordInput, { target: { value: "1234" } })
      fireEvent.click(buttonSubmit)
    })
    await waitFor(() => {
      expect(buttonSubmit).toBeDisabled()
      expect(screen.getByDisplayValue("email")).toBeInTheDocument()
      expect(screen.getByText("Invalid email")).toBeInTheDocument()
      expect(screen.getByText("Password must be at least 5 characters")).toBeInTheDocument()
    })

    act(() => {
      fireEvent.change(emailInput, { target: { value: "email@valid.com" } })
      fireEvent.change(passwordInput, { target: { value: "123456" } })
      fireEvent.click(buttonSubmit)
    })
    await waitFor(() => {
      expect(buttonSubmit).toBeEnabled()
      expect(screen.getByDisplayValue("email@valid.com")).toBeInTheDocument()
      expect(() => screen.getByText('Invalid email')).toThrow('Unable to find an element')
      expect(() => screen.getByText('Password must be at least 5 characters')).toThrow('Unable to find an element')
    })
  })
})
