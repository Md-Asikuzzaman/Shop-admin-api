import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
interface CategoryType {
  _id: string;
  category: string;
  parent: string;
}

interface DataType {
  loading: boolean;
  category: CategoryType[];
  error: string;
}

const initialState: DataType = {
  loading: false,
  category: [],
  error: '',
};

// FETCH CATEGORIES
export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async () => {
    try {
      const res = await axios.get('/api/category');
      return res.data.category;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

// ADD CATEGORY
export const addCategory = createAsyncThunk(
  'category/addCategory',
  async (data: any) => {
    try {
      const res = await axios.post('/api/category', data);
      return res.data.newCategory;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

// DELETE CATEGORY
export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (id: any) => {
    try {
      const res = await axios.delete(`/api/category/${id}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

// UPDATE Category
export const updateCategory = createAsyncThunk(
  'product/updateCategory',
  async (data: any) => {
    const { id } = data;
    try {
      const res = await axios.put(`/api/category/${id}`, data);
      return res.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // FETCH CATEGORIES
    builder.addCase(fetchCategories.pending, (state, action) => {
      state.loading = true;
      state.category = [];
      state.error = '';
    });

    builder.addCase(
      fetchCategories.fulfilled,
      (state, action: PayloadAction<CategoryType[]>) => {
        state.loading = false;
        state.category = action.payload;
        state.error = '';
      }
    );

    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = true;
      state.category = [];
      state.error = '';
    });

    // ADD CATEGORY
    builder.addCase(addCategory.pending, (state, action) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(
      addCategory.fulfilled,
      (state, action: PayloadAction<CategoryType>) => {
        state.loading = false;
        state.category.push(action.payload);
        state.error = '';
      }
    );

    builder.addCase(addCategory.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message || 'Something went wrong!!!';
    });

    // DELETE CATEGORY
    builder.addCase(deleteCategory.pending, (state, action) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(
      deleteCategory.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.category = state.category.filter(
          (category) => String(category._id) !== String(action.payload?.id)
        );
        state.error = '';
      }
    );

    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message || 'Something went wrong!!!';
    });

    // UPDATE CATEGORY
    builder.addCase(updateCategory.pending, (state, action) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(
      updateCategory.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.category = state.category.map((data) =>
          data._id === action.payload.id ? action.payload?.data : data
        );
        state.error = '';
      }
    );

    builder.addCase(updateCategory.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error.message || 'Something went wrong!!!';
    });
  },
});

export default categorySlice.reducer;
