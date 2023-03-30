import { createSlice } from "@reduxjs/toolkit"
import usersService from "../services/users"

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setAllUsers(state, action) {
      return action.payload
    },
  },
})

export const { setAllUsers } = usersSlice.actions

export const initializeAllUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()
    dispatch(setAllUsers(users))
  }
}

export default usersSlice.reducer
