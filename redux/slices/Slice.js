import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add: (state, action) => {
      const existingItemIndex = state.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex >= 0) {
        state[existingItemIndex].qty += 1;
      } else {
        state.push({ ...action.payload, qty: 1 });
      }
    },
    remove: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
    decrement: (state, action) => {
      const existingItemIndex = state.findIndex(item => item.id === action.payload);
      if (existingItemIndex >= 0) {
        if (state[existingItemIndex].qty > 1) {
          state[existingItemIndex].qty -= 1;
        } else {
          return state.filter(item => item.id !== action.payload);
        }
      }
    }
  }
});

export const { add, remove, decrement } = Slice.actions;
export default Slice.reducer;