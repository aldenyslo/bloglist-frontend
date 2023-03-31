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
    <div className="grid gap-1 max-w-fit mb-2 [&>*]:text-slate-800">
      <h2 className="font-bold capitalize text-lg">create new</h2>
      <form onSubmit={addBlog} className="grid gap-2">
        <div>
          <label className="capitalize">title:</label>
          <input
            type="text"
            value={title}
            name="Title"
            onChange={(e) => setTitle(e.target.value)}
            id="title-input"
            className="ml-2 border-2 border-gray-400 rounded"
          />
        </div>
        <div>
          <label className="capitalize">author:</label>
          <input
            type="text"
            value={author}
            name="Author"
            onChange={(e) => setAuthor(e.target.value)}
            id="author-input"
            className="ml-2 border-2 border-gray-400 rounded"
          />
        </div>
        <div>
          <label className="capitalize">url:</label>
          <input
            type="text"
            value={url}
            name="Url"
            onChange={(e) => setUrl(e.target.value)}
            id="url-input"
            className="ml-2 border-2 border-gray-400 rounded"
          />
        </div>
        <button
          type="submit"
          id="create-btn"
          className="bg-red-400 text-white capitalize py-1 rounded-md transition ease-linear hover:bg-red-500"
        >
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
