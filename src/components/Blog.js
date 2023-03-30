import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { likeBlog, removeBlog } from "../reducers/blogReducer"
import CommentForm from "./Comments"

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!blog) return

  const user = useSelector((state) => state.user)

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button onClick={() => dispatch(likeBlog(blog))} className="like-btn">
          like
        </button>
        <br></br>
        added by {blog.user.name}
      </div>
      {user.username === blog.user.username ? (
        <button
          onClick={() => {
            dispatch(removeBlog(blog.id))
            navigate("/")
          }}
          className="remove-btn"
        >
          remove
        </button>
      ) : null}
      <CommentForm id={blog.id} />
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
