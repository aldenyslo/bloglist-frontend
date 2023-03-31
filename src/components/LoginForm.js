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
    <div className="pb-4">
      <h2 className="bg-red-400 font-bold text-xl p-3 text-white text-center">
        Log in to application
      </h2>
      <form onSubmit={loginSubmit} className="grid gap-3 justify-center mt-5">
        <div>
          <label className="capitalize">username</label>
          <input
            className="border-2 ml-2 border-gray-400 rounded p-0.5"
            type="text"
            value={username}
            name="Username"
            onChange={(e) => setUsername(e.target.value)}
            id="username"
          />
        </div>
        <div>
          <label className="capitalize">password</label>
          <input
            className="border-2 ml-2 border-gray-400 rounded p-0.5"
            type="password"
            value={password}
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />
        </div>
        <button
          type="submit"
          id="login-btn"
          className="bg-red-400 capitalize rounded-md font-bold hover:bg-red-500 text-white py-1"
        >
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
