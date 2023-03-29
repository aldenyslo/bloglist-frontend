import { useSelector } from "react-redux"
import Blog from "./Blog"

const Blogs = ({ user }) => {
  if (!user) return
  const blogs = useSelector((state) => state.blogs)
  console.log(blogs)
  return (
    <div>
      {blogs
        // .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
    </div>
  )
}

export default Blogs
