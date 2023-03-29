import { useState } from "react"
import { useDispatch } from "react-redux"
import { createBlog } from "../reducers/blogReducer"
import { setNotification } from "../reducers/notifReducer"

const BlogForm = ({ toggleVisibility }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const dispatch = useDispatch()

  const addBlog = (e) => {
    e.preventDefault()
    toggleVisibility()
    dispatch(createBlog({ title, author, url }))
    dispatch(
      setNotification(`a new blog ${title} by ${author} added`, "success", 5000)
    )
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={(e) => setTitle(e.target.value)}
            id="title-input"
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={(e) => setAuthor(e.target.value)}
            id="author-input"
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={(e) => setUrl(e.target.value)}
            id="url-input"
          />
        </div>
        <button type="submit" id="create-btn">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
