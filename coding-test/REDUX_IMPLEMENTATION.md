# Redux Toolkit Implementation

## Overview

Redux Toolkit (RTK) has been successfully integrated into the React boilerplate, providing a robust state management solution with a single source of truth. The implementation follows Redux Toolkit best practices and is designed to be easily extensible.

## What Was Implemented

### 1. **Dependencies Installed**
- `@reduxjs/toolkit` - Official Redux Toolkit
- `react-redux` - React bindings for Redux

### 2. **Folder Structure**

```
src/
  store/
    index.ts              # Store configuration and root types
    hooks.ts              # Typed hooks (useAppDispatch, useAppSelector)
    Provider.tsx          # Redux Provider component
    slices/
      appSlice.ts         # Example app slice (UI state)
      index.ts            # Barrel exports for slices
```

### 3. **Store Configuration**

The store (`src/store/index.ts`) is configured with:
- **Redux DevTools**: Enabled in development mode
- **Middleware**: Configured with serializable checks
- **Type Safety**: Full TypeScript support with `RootState` and `AppDispatch` types

### 4. **Example Slice: App Slice**

An example `appSlice` demonstrates the pattern with:
- **Sidebar state**: Toggle and set sidebar open/closed
- **Theme mode**: Light/dark theme preference
- **Notifications**: Add, remove, and clear notifications

### 5. **Typed Hooks**

Pre-configured typed hooks for type-safe Redux usage:
- `useAppDispatch()` - Typed dispatch function
- `useAppSelector()` - Typed selector hook

## Usage

### Using Redux in Components

```typescript
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { toggleSidebar, setThemeMode } from '@store/slices/appSlice';

function MyComponent() {
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector((state) => state.app.sidebarOpen);
  const themeMode = useAppSelector((state) => state.app.themeMode);

  const handleToggle = () => {
    dispatch(toggleSidebar());
  };

  const handleThemeChange = (mode: 'light' | 'dark') => {
    dispatch(setThemeMode(mode));
  };

  return (
    <div>
      <p>Sidebar: {sidebarOpen ? 'Open' : 'Closed'}</p>
      <p>Theme: {themeMode}</p>
      <button onClick={handleToggle}>Toggle Sidebar</button>
    </div>
  );
}
```

### Creating a New Slice

1. Create a new slice file in `src/store/slices/`:

```typescript
// src/store/slices/userSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  currentUser: {
    id: string;
    name: string;
    email: string;
  } | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState['currentUser']>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
```

2. Add the reducer to the store:

```typescript
// src/store/index.ts
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer, // Add your new reducer
  },
  // ... rest of config
});
```

3. Export from slices barrel:

```typescript
// src/store/slices/index.ts
export { default as userReducer } from './userSlice';
export * from './userSlice';
```

### Using Async Actions (Thunks)

For async operations, use `createAsyncThunk`:

```typescript
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '@api/axiosInstance';

// Async thunk
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId: string) => {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    loading: false,
    error: null,
  },
  reducers: {
    // ... sync reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
```

### Selectors (Memoized)

For complex selectors, use `createSelector` from `@reduxjs/toolkit`:

```typescript
import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@store/index';

// Simple selector
const selectUser = (state: RootState) => state.user.currentUser;

// Memoized selector
const selectUserFullName = createSelector(
  [selectUser],
  (user) => user ? `${user.firstName} ${user.lastName}` : ''
);

// Usage in component
const fullName = useAppSelector(selectUserFullName);
```

## Redux DevTools

Redux DevTools are automatically enabled in development mode. To use:

1. Install the [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools) in your browser
2. Open the browser DevTools
3. Navigate to the "Redux" tab
4. View state changes, dispatch actions, and time-travel debug

## Best Practices

### 1. **Keep Slices Focused**
- Each slice should manage a specific domain of state
- Keep slices small and focused

### 2. **Use Typed Hooks**
- Always use `useAppDispatch` and `useAppSelector` instead of plain hooks
- This ensures full TypeScript type safety

### 3. **Normalize State**
- For complex nested data, consider normalizing the state structure
- Use libraries like `normalizr` if needed

### 4. **Separate Concerns**
- Use Redux for global app state
- Use React Query for server state (already implemented)
- Use local component state for UI-only state

### 5. **Action Naming**
- Use descriptive action names: `user/login`, `user/logout`
- Follow the pattern: `sliceName/actionName`

### 6. **Immutable Updates**
- Redux Toolkit uses Immer internally, so you can write "mutating" code
- But be aware of the rules: only modify state within reducers

## File Structure Pattern

```
store/
  index.ts              # Store config, RootState, AppDispatch
  hooks.ts              # Typed hooks
  Provider.tsx          # Redux Provider
  slices/
    appSlice.ts         # App-level UI state
    userSlice.ts        # User/auth state
    featureSlice.ts     # Feature-specific state
    index.ts            # Barrel exports
```

## Integration with React Query

Redux and React Query work together:
- **Redux**: Global app state, UI preferences, client-side state
- **React Query**: Server state, caching, data fetching

Example:
```typescript
// Redux for UI state
const sidebarOpen = useAppSelector((state) => state.app.sidebarOpen);

// React Query for server data
const { data: employees } = useEmployees();
```

## TypeScript Support

Full TypeScript support is included:
- `RootState` - Type for the entire state tree
- `AppDispatch` - Type for dispatch function
- Typed hooks ensure type safety throughout the app

## Testing

The implementation has been tested and verified:
- ✅ TypeScript compilation passes
- ✅ ESLint passes
- ✅ Build succeeds
- ✅ Redux DevTools integration works
- ✅ Provider properly wraps the app

## Files Created/Modified

### Created:
- `src/store/index.ts` - Store configuration
- `src/store/hooks.ts` - Typed hooks
- `src/store/Provider.tsx` - Redux Provider
- `src/store/slices/appSlice.ts` - Example app slice
- `src/store/slices/index.ts` - Barrel exports

### Modified:
- `src/main.tsx` - Added ReduxProvider
- `vite.config.ts` - Added `@store` alias
- `tsconfig.json` - Added `@store` alias
- `package.json` - Added Redux dependencies

## Next Steps

1. **Add more slices** - Create slices for different features (user, cart, settings, etc.)
2. **Add middleware** - Consider adding middleware for logging, persistence, etc.
3. **Add RTK Query** - For advanced data fetching needs (alternative to React Query)
4. **State persistence** - Use `redux-persist` to persist state to localStorage
5. **Testing** - Add unit tests for slices and selectors

## Example: Complete Feature Slice

```typescript
// src/store/slices/cartSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
```

---

**Redux Toolkit Implementation Complete!** 🎉

The boilerplate now has a robust, type-safe state management solution that's easy to extend and maintain.

