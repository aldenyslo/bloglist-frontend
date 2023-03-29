import { createSlice } from "@reduxjs/toolkit"

const notifSlice = createSlice({
  name: "notification",
  initialState: [],
  reducers: {
    setNotif(state, action) {
      return action.payload
    },
    removeNotif() {
      return ""
    },
  },
})

export const { setNotif, removeNotif } = notifSlice.actions

export const setNotification = (msg, status, time) => {
  return async (dispatch) => {
    dispatch(setNotif([msg, status]))
    setTimeout(() => dispatch(removeNotif()), time)
  }
}

export default notifSlice.reducer
