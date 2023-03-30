import { useRef } from "react"
import Togglable from "./Togglable"
import BlogForm from "./BlogForm"
import Blogs from "./BlogList"

const Home = () => {
  const blogFormRef = useRef()
  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          toggleVisibility={() => blogFormRef.current.toggleVisibility()}
        />
      </Togglable>
      <Blogs />
    </div>
  )
}

export default Home
