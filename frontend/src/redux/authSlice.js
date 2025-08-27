import { createSlice } from "@reduxjs/toolkit";

const authslice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
  },
  reducer: {
    //actions
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setLoading, setAuthUser } = authslice.actions;
export default authslice.reducer;
