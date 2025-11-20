import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductsState } from '../types';
import { api } from '../services/api';

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  categories: [],
  selectedCategory: 'all',
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const products = await api.fetchProducts();
  return products;
});

export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const categories = await api.fetchCategories();
  return categories;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setSelectedCategory } = productSlice.actions;
export default productSlice.reducer;