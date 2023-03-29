import { useState } from "react"
import { useDispatch } from "react-redux"
import { likeBlog, removeBlog } from "../reducers/blogReducer"

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = (e) => {
    setVisible(!visible)
    changeLabel(e)
  }

  const changeLabel = (e) => {
    e.target.textContent = e.target.textContent === "view" ? "hide" : "view"
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <button onClick={toggleVisibility} className="view-btn">
        view
      </button>
      <div style={showWhenVisible} className="moreInfo">
        {blog.url}
        <br></br>
        likes {blog.likes}
        <button onClick={() => dispatch(likeBlog(blog))} className="like-btn">
          like
        </button>
        <br></br>
        {blog.user.name}
        <br></br>
        {user.username === blog.user.username ? (
          <button
            onClick={() => {
              dispatch(removeBlog(blog.id))
            }}
            className="remove-btn"
          >
            remove
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default Blog
