import { createSlice } from "@reduxjs/toolkit";

// Load user from localStorage (if available)
const storedUser = localStorage.getItem("user");

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    user: storedUser ? JSON.parse(storedUser) : null
  },

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;

      // Persist user in localStorage
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    }
  }
});

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;
