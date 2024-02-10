import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getToken } from "next-auth/jwt";
const initialState = {
  name: null,
  email: null,
  token: null,
  image: null,
  role: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: async (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.image = action.payload.image;
      state.role = action.payload.role;
    },
  },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
