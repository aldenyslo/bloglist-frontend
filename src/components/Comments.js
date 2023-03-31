import { commentBlog } from "../reducers/blogReducer"
import { useDispatch } from "react-redux"
import { useState } from "react"

const CommentForm = ({ id }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState("")

  const submitComment = (e) => {
    e.preventDefault()
    if (!comment) return

    dispatch(commentBlog(id, comment))
    setComment("")
  }

  return (
    <div className="grid gap-2 mt-6">
      <h3 className="capitalize font-bold text-lg">comments</h3>
      <form onSubmit={submitComment} className="flex gap-3">
        <input
          className="border-2 border-gray-400 rounded"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type="submit"
          className="bg-red-400 text-white rounded py-1 px-3 transition ease-linear hover:bg-red-500"
        >
          add comment
        </button>
      </form>
    </div>
  )
}

export default CommentForm
