import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div className="grid gap-3">
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div
            key={blog.id}
            className="border-2 p-2 border-slate-400 border-opacity-60 rounded-md"
          >
            <Link
              to={`/blogs/${blog.id}`}
              className="hover:italic text-red-400 capitalize"
            >
              {blog.title}
            </Link>
          </div>
        ))}
    </div>
  )
}

export default Blogs
