import { useState } from "react"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notifReducer"
import { loginUser } from "../reducers/userReducer"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const loginSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(loginUser(username, password))
      setUsername("")
      setPassword("")
    } catch (exception) {
      dispatch(setNotification("wrong username or password", "error", 5000))
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={loginSubmit}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={(e) => setUsername(e.target.value)}
            id="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />
        </div>
        <button type="submit" id="login-btn">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
