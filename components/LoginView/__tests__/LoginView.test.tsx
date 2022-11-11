import { screen, fireEvent, render, waitFor } from '@testing-library/react'
import { LoginView } from '@/components/LoginView'
import { act } from 'react-dom/test-utils'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

describe("LoginView", () => {
  it("Forms validates correctly", async () => {
    const setUserMock = jest.fn()
    const { getByTestId } = render(<LoginView setUser={setUserMock} />)

    const emailInput = getByTestId("email-input")
    const passwordInput = getByTestId("password-input")
    const buttonSubmit = getByTestId("button-submit")

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

  describe('Integration tests intercepting HTTP Request', () => {
    const ERROR_MESSAGE = 'User already exists'
    const server = setupServer(
      rest.post('http://localhost:3000/api/login', (_req, res, ctx) => {
        return res(ctx.status(201), ctx.json({ error: ERROR_MESSAGE }))
      }),
    )

    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    it("After submit, simulates some api validation error", async () => {
      const setUserMock = jest.fn()
      const { getByTestId } = render(<LoginView setUser={setUserMock} />)
      const emailInput = getByTestId("email-input")
      const passwordInput = getByTestId("password-input")
      const buttonSubmit = getByTestId("button-submit")

      act(() => {
        fireEvent.change(emailInput, { target: { value: "email@email.com" } })
        fireEvent.change(passwordInput, { target: { value: "1234567" } })
        fireEvent.click(buttonSubmit)
      })
      expect(buttonSubmit).toBeEnabled()

      await waitFor(() => {
        expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument()
        expect(setUserMock).toHaveBeenCalledTimes(0)
      })
    })
  })
})
