import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface ProductType {
  _id: string;
  title: string;
  description: string;
  price: number;
  photo: string;
}

interface DataType {
  loading: boolean;
  products: ProductType[];
  error: string;
}

const initialState: DataType = {
  loading: false,
  products: [],
  error: '',
};

// FETCH PRODUCTS
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    try {
      const res = await axios.get('/api/product');
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
// ADD PRODUCT
export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (data: any) => {
    try {
      const res = await axios.post('/api/product', data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
// DELETE PRODUCT
export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id: any) => {
    try {
      const res = await axios.delete(`/api/product/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
// UPDATE PRODUCT
export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (data: any) => {
    const { id } = data.formData;

    try {
      console.log('TCL: data', id);
      const res = await axios.put(`/api/product/${id}`, data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch products
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = true;
      state.products = [];
      state.error = '';
    });

    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<ProductType[]>) => {
        state.loading = false;
        state.products = action.payload;
        state.error = '';
      }
    );

    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message || 'Something went wrong!!!';
    });

    // add product
    builder.addCase(addProduct.pending, (state, action) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(
      addProduct.fulfilled,
      (state, action: PayloadAction<ProductType>) => {
        state.loading = false;
        state.products.push(action.payload);
        console.log('TCL: action.payload', action.payload);
        state.error = '';
      }
    );

    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message || 'Something went wrong!!!';
    });

    // delete product
    builder.addCase(deleteProduct.pending, (state, action) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(
      deleteProduct.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => String(product._id) !== String(action.payload?.id)
        );
        state.error = '';
      }
    );

    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message || 'Something went wrong!!!';
    });

    // update product
    builder.addCase(updateProduct.pending, (state, action) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(
      updateProduct.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.products = state.products.map((data) =>
          data._id === action.payload.id ? action.payload.data : data
        );
        state.error = '';
      }
    );

    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message || 'Something went wrong!!!';
    });
  },
});

export default productSlice.reducer;
