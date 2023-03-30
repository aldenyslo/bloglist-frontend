import { configureStore } from "@reduxjs/toolkit"

import notifReducer from "./reducers/notifReducer"
import blogReducer from "./reducers/blogReducer"
import userReducer from "./reducers/userReducer"
import usersReducer from "./reducers/allUsersReducer"

const store = configureStore({
  reducer: {
    notification: notifReducer,
    blogs: blogReducer,
    user: userReducer,
    users: usersReducer,
  },
})

export default store
