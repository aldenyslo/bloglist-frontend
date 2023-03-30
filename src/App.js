import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Routes, Route, useMatch } from "react-router-dom"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import Home from "./components/Home"
import Users from "./components/Users"
import User from "./components/User"
import Blog from "./components/Blog"
import Navbar from "./components/Navbar"

import { initializeBlogs } from "./reducers/blogReducer"
import { initializeUser } from "./reducers/userReducer"
import { initializeAllUsers } from "./reducers/allUsersReducer"

const App = () => {
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
    dispatch(initializeAllUsers())
  }, [dispatch])

  const userMatch = useMatch("/users/:id")
  const blogMatch = useMatch("/blogs/:id")

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  const viewUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  const viewBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  return (
    <div>
      <Navbar user={user} />
      <h2>blogs</h2>
      <Notification />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User user={viewUser} />} />
        <Route path="/blogs/:id" element={<Blog blog={viewBlog} />} />
      </Routes>
    </div>
  )
}

export default App
