import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserState, User, Address } from '../types';

// Mock API calls - will be replaced with actual API calls
const mockFetchProfile = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    phone: '+1234567890',
    role: 'USER' as const,
    emailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

const mockFetchAddresses = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: '1',
      label: 'Home',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US',
      isDefault: true,
    },
    {
      id: '2',
      label: 'Work',
      street: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      postalCode: '10002',
      country: 'US',
      isDefault: false,
    },
  ];
};

const mockUpdateProfile = async (updates: Partial<User>) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return updates;
};

const mockAddAddress = async (address: Omit<Address, 'id'>) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    ...address,
    id: Date.now().toString(),
  };
};

const mockUpdateAddress = async (id: string, updates: Partial<Address>) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { id, ...updates };
};

const mockDeleteAddress = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return id;
};

// Async thunks
export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async () => {
    return await mockFetchProfile();
  }
);

export const fetchAddresses = createAsyncThunk(
  'user/fetchAddresses',
  async () => {
    return await mockFetchAddresses();
  }
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (updates: Partial<User>) => {
    return await mockUpdateProfile(updates);
  }
);

export const addAddress = createAsyncThunk(
  'user/addAddress',
  async (address: Omit<Address, 'id'>) => {
    return await mockAddAddress(address);
  }
);

export const updateAddress = createAsyncThunk(
  'user/updateAddress',
  async ({ id, updates }: { id: string; updates: Partial<Address> }) => {
    return await mockUpdateAddress(id, updates);
  }
);

export const deleteAddress = createAsyncThunk(
  'user/deleteAddress',
  async (id: string) => {
    return await mockDeleteAddress(id);
  }
);

const initialState: UserState = {
  profile: null,
  addresses: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setDefaultAddress: (state, action: PayloadAction<string>) => {
      state.addresses.forEach(address => {
        address.isDefault = address.id === action.payload;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch profile';
      })
      // Fetch addresses
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch addresses';
      })
      // Update profile
      .addCase(updateProfile.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile = { ...state.profile, ...action.payload };
        }
      })
      // Add address
      .addCase(addAddress.fulfilled, (state, action) => {
        state.addresses.push(action.payload);
      })
      // Update address
      .addCase(updateAddress.fulfilled, (state, action) => {
        const index = state.addresses.findIndex(addr => addr.id === action.payload.id);
        if (index !== -1) {
          state.addresses[index] = { ...state.addresses[index], ...action.payload };
        }
      })
      // Delete address
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter(addr => addr.id !== action.payload);
      });
  },
});

export const { clearError: clearUserError, setDefaultAddress } = userSlice.actions;
export default userSlice.reducer;
