import { screen, fireEvent, render, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import SignupView from '@/pages/Signup'
import { setupServer } from "msw/node"
import { rest } from "msw"

describe("SignUp", () => {
  it("Forms validates correctly", async () => {
    const { getByTestId } = render(<SignupView />)

    const name = getByTestId("name-input")
    const username = getByTestId("username-input")
    const emailInput = getByTestId("email-input")
    const passwordInput = getByTestId("password-input")
    const buttonSubmit = getByTestId("button-submit")

    act(() => {
      fireEvent.change(name, { target: { value: "Name too bigasdsadsadasd 1234567" } })
      fireEvent.change(username, { target: { value: "123456789characterstoobig" } })
      fireEvent.change(emailInput, { target: { value: "email@." } })
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

  describe('Integration tests with api', () => {
    const server = setupServer(
      rest.post('http://localhost:3000/api/createUser', (_req, res, ctx) => {
        return res(ctx.status(201), ctx.json({ error: 'User not found' }))
      }),
    )

    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    it("After submit, simulates some api validation error", async () => {
      const { getByTestId } = render(<SignupView />)

      const name = getByTestId("name-input")
      const username = getByTestId("username-input")
      const emailInput = getByTestId("email-input")
      const passwordInput = getByTestId("password-input")
      const buttonSubmit = getByTestId("button-submit")

      act(() => {
        fireEvent.change(name, { target: { value: "Name ok" } })
        fireEvent.change(username, { target: { value: "Username ok" } })
        fireEvent.change(emailInput, { target: { value: "email@email.com" } })
        fireEvent.change(passwordInput, { target: { value: "1234567" } })
        fireEvent.click(buttonSubmit)
      })
      expect(buttonSubmit).toBeEnabled()

      await waitFor(() => {
        expect(screen.getByText("User not found")).toBeInTheDocument()
      })
    })
  })
})
