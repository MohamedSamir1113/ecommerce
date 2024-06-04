import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: "idle",
  error: "",
  message: "",
  user: {},
};

export const userRegister = createAsyncThunk(
  "register/registerUser",
  async function (newUser, thunkAPI) {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      {
        method: "POST",
        body: JSON.stringify(newUser),
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

const registerSlice = createSlice({
  name: "register",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(userRegister.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = "idle";
        state.user=action.payload.user
        state.message = action.payload.message;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.error = action.error.message;
      }),
});

export default registerSlice.reducer;
