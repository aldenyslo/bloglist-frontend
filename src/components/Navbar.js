import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logoutUser } from "../reducers/userReducer"

const Navbar = ({ user }) => {
  const dispatch = useDispatch()

  return (
    <div className="bg-red-400 flex gap-4 text-white p-4 items-center">
      <Link to="/" className="underline capitalize hover:italic">
        blogs
      </Link>
      <Link to="/users" className="underline capitalize hover:italic">
        users
      </Link>
      <span className="italic">{`${user.name} logged in`}</span>
      <button
        className="bg-white text-red-400 p-1 px-3 rounded-lg hover:transition-all hover:scale-110"
        onClick={() => dispatch(logoutUser())}
      >
        logout
      </button>
    </div>
  )
}

export default Navbar
