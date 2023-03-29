import { configureStore } from "@reduxjs/toolkit"

import notifReducer from "./reducers/notifReducer"
import blogReducer from "./reducers/blogReducer"

const store = configureStore({
  reducer: {
    notification: notifReducer,
    blogs: blogReducer,
  },
})

export default store
