import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface counterType {
  counter: number;
}

const initialState: counterType = {
  counter: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.counter++;
    },
    decrement: (state) => {
      state.counter--;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.counter += action.payload;
    },

    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.counter -= action.payload;
    },
  },
});

export default counterSlice.reducer;
export const { increment, decrement, incrementByAmount, decrementByAmount } =
  counterSlice.actions;
