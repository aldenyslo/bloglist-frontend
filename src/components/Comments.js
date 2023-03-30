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
    <div>
      <h3>comments</h3>
      <form onSubmit={submitComment}>
        <input value={comment} onChange={(e) => setComment(e.target.value)} />
        <button type="submit">add comment</button>
      </form>
    </div>
  )
}

export default CommentForm
