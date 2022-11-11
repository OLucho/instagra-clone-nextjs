import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import IndexPage from '@/pages/index'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { act } from 'react-dom/test-utils'

describe("Index Page", () => {
  it("Renders Correctly if user is Logged in", () => {
    const USER_MOCK = '{"id":1,"name":"USERNAME"}'
    Storage.prototype.getItem = jest.fn(() => USER_MOCK)

    const component = render(<IndexPage />)

    expect(component.getByText("Hello USERNAME")).toBeInTheDocument()
  })

  it("Renders Correctly if user is not Logged in", () => {
    Storage.prototype.getItem = jest.fn(() => null)

    const component = render(<IndexPage />)

    expect(component.getByText("Instagram")).toBeInTheDocument()
    expect(component.getByTestId("button-submit")).toBeInTheDocument()
  })

  describe('Integration with Api Tests', () => {
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    const USER_MOCK = { user: { id: 2, username: "asdsad", email: "asd@asd.com", name: "asdasd", password: "asdasd", createdAt: "2022-11-09T18:55:41.333Z", updatedAt: "2022-11-09T18:55:41.333Z" } }
    const server = setupServer(
      rest.post('http://localhost:3000/api/login', (_req, res, ctx) => {
        return res(ctx.status(200), ctx.json(USER_MOCK))
      }),
    )

    it('When sending a valid form, the api responds correctly with the uesr data and is displayed on the screen', async () => {
      Storage.prototype.getItem = jest.fn(() => null)

      const { getByTestId } = render(<IndexPage />)

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
        expect(screen.getByText(`Hello ${USER_MOCK.user.name}`)).toBeInTheDocument()
      })
    })
  })
})
