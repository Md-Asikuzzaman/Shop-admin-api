import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/product/productSlice';
import categoryReducer from './features/category/categorySlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
