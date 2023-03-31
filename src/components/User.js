const User = ({ user }) => {
  if (!user) return
  return (
    <div className="[&>*]:text-slate-800">
      <h2 className="font-bold text-2xl mb-4 ml-4">{user.name}</h2>
      <h3 className="font-bold text-lg capitalize ml-4">added blogs</h3>
      <ul className="[&>*:nth-child(odd)]:bg-gray-200">
        {user.blogs.map((blog) => (
          <li key={blog.id} className="text-red-500 pl-4 py-2 font-medium">
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User
