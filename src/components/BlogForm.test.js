import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"

describe("<BlogForm />", () => {
  test("updates parent state and calls submit handler", async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    const { container } = render(<BlogForm createBlog={createBlog} />)

    const titleInput = container.querySelector("#title-input")
    const authorInput = container.querySelector("#author-input")
    const urlInput = container.querySelector("#url-input")
    const createBtn = screen.getByText("create")

    await user.type(titleInput, "wubba")
    await user.type(authorInput, "lubba")
    await user.type(urlInput, "dub dub")
    await user.click(createBtn)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe("wubba")
  })
})
