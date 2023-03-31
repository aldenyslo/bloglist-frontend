import { Link } from "react-router-dom"

const Users = ({ users }) => {
  return (
    <div className="m-4 [&>*]:text-slate-800">
      <h2 className="font-bold text-2xl mb-2">Users</h2>
      <table className="table-auto">
        <thead>
          <tr className="[&>th]:border [&>th]:p-2">
            <th className="border capitalize">name</th>
            <th className="border capitalize"> blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="[&>td]:border [&>td]:p-2 [&>td]:text-center"
            >
              <td>
                <Link
                  to={`/users/${user.id}`}
                  className="hover:text-red-400 transition ease-in-out hover:italic hover:underline"
                >
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
