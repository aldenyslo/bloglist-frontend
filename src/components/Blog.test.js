import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe("<Blog />", () => {
  const blog = {
    title: "wubba lubba",
    author: "dub dub",
    url: "http://ricknmorty.com",
    likes: 12,
    user: {
      username: "lmao",
      name: "lol",
    },
  }

  const userSession = {
    username: "lmao",
    name: "lol",
  }

  test("renders title and author without url or likes", () => {
    const { container } = render(<Blog blog={blog} user={userSession} />)

    const div = container.querySelector(".blog")
    expect(div).toHaveTextContent("wubba lubba")
    expect(div).toHaveTextContent("dub dub")
    const hidden = container.querySelector(".moreInfo")
    expect(hidden).toHaveStyle("display: none")
  })

  test("url and likes shown after show click", async () => {
    const { container } = render(<Blog blog={blog} user={userSession} />)

    const user = userEvent.setup()
    const button = screen.getByText("view")
    await user.click(button)

    const div = container.querySelector(".moreInfo")
    expect(div).not.toHaveStyle("display: none")
    expect(div).toHaveTextContent("http://ricknmorty.com")
  })

  test("clicking like button twice, event handler called twice", async () => {
    const mockHandler = jest.fn()

    render(<Blog blog={blog} user={userSession} changeBlog={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText("like")
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
