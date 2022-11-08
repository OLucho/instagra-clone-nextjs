import { render } from '@testing-library/react'
import IndexPage from '@/pages/index'

describe("Index Page", () => {
  it("Renders Correctly if user is Logged in", () => {
    Storage.prototype.getItem = jest.fn(() => "user object")

    const component = render(<IndexPage />)

    expect(component.getByText("Home Page if user is logged")).toBeInTheDocument()
  })

  it("Renders Correctly if user is not Logged in", () => {
    Storage.prototype.getItem = jest.fn(() => null)

    const component = render(<IndexPage />)

    expect(component.getByText("Instagram")).toBeInTheDocument()
    expect(component.getByTestId("button-submit")).toBeInTheDocument()
  })
})
