import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem, Product } from '../types';

// Mock API calls - will be replaced with actual API calls
const mockAddToCart = async (productId: string, quantity: number) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock product data
  const mockProduct: Product = {
    id: productId,
    title: 'Sample Product',
    slug: 'sample-product',
    description: 'A sample product description',
    price: 29.99,
    salePrice: 24.99,
    sku: 'SP001',
    quantity: 10,
    category: {
      id: '1',
      name: 'Electronics',
      slug: 'electronics',
    },
    brand: 'Sample Brand',
    ratingAvg: 4.5,
    ratingCount: 100,
    images: [
      {
        id: '1',
        url: 'https://via.placeholder.com/300x300',
        altText: 'Sample Product Image',
        orderIndex: 0,
      },
    ],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return {
    id: Date.now().toString(),
    productId,
    product: mockProduct,
    quantity,
    priceSnapshot: mockProduct.salePrice || mockProduct.price,
  };
};

const mockRemoveFromCart = async (itemId: string) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return itemId;
};

const mockUpdateCartItem = async (itemId: string, quantity: number) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { itemId, quantity };
};

const mockGetCart = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [];
};

// Async thunks
export const addToCart = createAsyncThunk(
  'cart/addItem',
  async ({ productId, quantity }: { productId: string; quantity: number }) => {
    return await mockAddToCart(productId, quantity);
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeItem',
  async (itemId: string) => {
    return await mockRemoveFromCart(itemId);
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateItem',
  async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
    return await mockUpdateCartItem(itemId, quantity);
  }
);

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async () => {
    return await mockGetCart();
  }
);

export const clearCart = createAsyncThunk('cart/clearCart', async () => {
  return [];
});

const initialState: CartState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    calculateTotal: (state) => {
      state.total = state.items.reduce((total, item) => {
        return total + (item.priceSnapshot * item.quantity);
      }, 0);
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        const existingItem = state.items.find(item => item.productId === action.payload.productId);
        
        if (existingItem) {
          existingItem.quantity += action.payload.quantity;
        } else {
          state.items.push(action.payload);
        }
        
        // Recalculate total
        state.total = state.items.reduce((total, item) => {
          return total + (item.priceSnapshot * item.quantity);
        }, 0);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add item to cart';
      })
      // Remove from cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        state.total = state.items.reduce((total, item) => {
          return total + (item.priceSnapshot * item.quantity);
        }, 0);
      })
      // Update cart item
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const item = state.items.find(item => item.id === action.payload.itemId);
        if (item) {
          item.quantity = action.payload.quantity;
          if (item.quantity <= 0) {
            state.items = state.items.filter(i => i.id !== action.payload.itemId);
          }
        }
        state.total = state.items.reduce((total, item) => {
          return total + (item.priceSnapshot * item.quantity);
        }, 0);
      })
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.total = state.items.reduce((total, item) => {
          return total + (item.priceSnapshot * item.quantity);
        }, 0);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cart';
      })
      // Clear cart
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        state.total = 0;
      });
  },
});

export const { clearError: clearCartError, calculateTotal } = cartSlice.actions;
export default cartSlice.reducer;
