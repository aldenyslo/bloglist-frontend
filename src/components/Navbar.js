import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logoutUser } from "../reducers/userReducer"

const Navbar = ({ user }) => {
  const dispatch = useDispatch()

  const navbarStyle = {
    display: "flex",
    gap: "0.5rem",
    backgroundColor: "lightgrey",
    padding: "0.5rem",
  }

  return (
    <div style={navbarStyle}>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      {`${user.name} logged in`}
      <button onClick={() => dispatch(logoutUser())}>logout</button>
    </div>
  )
}

export default Navbar
