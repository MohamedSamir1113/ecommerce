import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: "idle",
  message: "",
  error: "",
  token: localStorage.getItem("userToken") || "",
};

export const userLogin = createAsyncThunk(
  "login/loginUser",
  async function (User, thunkAPI) {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/signin`,
      {
        method: "POST",
        body: JSON.stringify(User),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);

    return data;
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    resetMessage(state, action) {
      state.message = "";
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = "idle";
        state.message = action.payload.message;
        state.token = action.payload.token;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
        state.message = "Login failed. Please try again.";
      }),
});

export default loginSlice.reducer;

export const { resetMessage } = loginSlice.actions;
