import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Blogs from "./components/BlogList"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"

import { initializeBlogs } from "./reducers/blogReducer"
import { initializeUser, logoutUser } from "./reducers/userReducer"

const App = () => {
  const user = useSelector((state) => state.user)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
  }, [dispatch])

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in</p>
      <button onClick={() => dispatch(logoutUser())} id="logout-btn">
        logout
      </button>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          toggleVisibility={() => blogFormRef.current.toggleVisibility()}
        />
      </Togglable>
      <Blogs user={user} />
    </div>
  )
}

export default App
