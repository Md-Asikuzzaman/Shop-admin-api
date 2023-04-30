import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface ProductType {
  _id: string;
  title: string;
  description: string;
  price: number;
  photo: string;
  category: string;
  color: string;
  createdAt: any;
  updatedAt: any;
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

// ADD PRODUCT
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    try {
      const res = await axios.get('/api/product');
      return res.data.products;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

// ADD PRODUCT
export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (data: any) => {
    try {
      const res = await axios.post('/api/product', data);
      console.log('TCL: res', res);
      return res.data.newProduct;
    } catch (error: any) {
      throw new Error(error);
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
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
// UPDATE PRODUCT
export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (data: any) => {
    const { id } = data.formData;

    try {
      const res = await axios.put(`/api/product/${id}`, data);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // FETCH PRODUCTS
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
      state.loading = true;
      state.products = [];
      state.error = '';
    });

    // ADD PRODUCTS
    builder.addCase(addProduct.pending, (state, action) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(
      addProduct.fulfilled,
      (state, action: PayloadAction<ProductType>) => {
        state.loading = false;
        state.products.push(action.payload);
        state.error = '';
      }
    );

    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message || 'Something went wrong!!!';
    });

    // DELETE PRODUCT
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

    // UPDATE PRODUCT
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
