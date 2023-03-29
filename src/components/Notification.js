import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  const baseStyle = {
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (notification.length === 0) {
    return null
  }

  return (
    <div
      style={
        notification[1] === "success"
          ? { ...baseStyle, color: "green" }
          : { ...baseStyle, color: "red" }
      }
    >
      {notification[0]}
    </div>
  )
}

export default Notification
