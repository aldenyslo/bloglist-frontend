import { useState, forwardRef, useImperativeHandle } from "react"
import PropTypes from "prop-types"

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = visible ? "hidden" : ""
  const showWhenVisible = visible ? "" : "hidden"

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div className={hideWhenVisible}>
        <button
          onClick={toggleVisibility}
          className="bg-red-700 text-white py-1 px-3 mb-3 rounded-md capitalize transition ease-linear hover:bg-red-800"
        >
          {props.buttonLabel}
        </button>
      </div>
      <div className={showWhenVisible}>
        {props.children}
        <button
          onClick={toggleVisibility}
          className="bg-red-700 text-white py-1 px-3 mb-3 rounded-md capitalize transition ease-linear hover:bg-red-800"
        >
          cancel
        </button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = "Togglable"

export default Togglable
