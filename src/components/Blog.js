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
    <div className="container ml-4 [&>*]:text-slate-800 grid gap-3">
      <h2 className="font-bold text-2xl capitalize">{blog.title}</h2>
      <div className="ml-4 grid gap-2">
        <a href={blog.url} className="italic underline hover:text-red-800">
          {blog.url}
        </a>
        <p className="flex gap-3 items-center">
          {blog.likes} likes
          <button
            onClick={() => dispatch(likeBlog(blog))}
            className="like-btn px-4 py-1 bg-red-400 text-white rounded-md transition ease-linear hover:bg-red-500"
          >
            like
          </button>
        </p>
        <p>Added by {blog.user.name}</p>
        {user.username === blog.user.username ? (
          <button
            onClick={() => {
              dispatch(removeBlog(blog.id))
              navigate("/")
            }}
            className="remove-btn rounded max-w-fit px-6 py-0.5 bg-slate-400 text-white transition ease-linear hover:bg-slate-500"
          >
            remove
          </button>
        ) : null}
      </div>
      <CommentForm id={blog.id} />
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index} className="before:content-['-'] before:mr-2">
            {comment}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
