import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cart: {},
  loading: "idle",
  message: "",
  error: "",
};

export const addProductToCart = createAsyncThunk(
  "cart/addToCart",
  async function (productId, thunkAPI) {
    const token = thunkAPI.getState().loginReducer.token;
    
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        {
          headers: {
            token: token,
          },
        }
      );
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(addProductToCart.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.loading = "idle";
        state.cart = action.payload.data; // assuming response structure has 'data' key
        state.message = action.payload.message;
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload || action.error.message;
      }),
});

export default cartSlice.reducer;
