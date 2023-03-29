import { useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import Blogs from "./components/BlogList"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"
import blogService from "./services/blogs"
import loginService from "./services/login"

import { setNotification } from "./reducers/notifReducer"
import { initializeBlogs } from "./reducers/blogReducer"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    console.log("useeffect")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log(user)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      dispatch(setNotification("wrong username or password", "error", 5000))
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()

    window.localStorage.removeItem("loggedBlogAppUser")
    setUser(null)
  }

  if (user === null) {
    console.log("user null")
    return (
      <div>
        <Notification />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in</p>
      <button onClick={handleLogout} id="logout-btn">
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
