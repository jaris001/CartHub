import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = 'http://localhost:3000';

const storedUser = localStorage.getItem('user');
const initialUser = storedUser ? JSON.parse(storedUser) : null;


export const signInUser = createAsyncThunk(
  'user/signInUser', 
  async ({name, email, password}, {rejectWithValue}) => {
    try {
      const newUser = {
        name,
        email,
        password,
        walletBalanceCents: 10000,
        orders: []
      };

      const response = await fetch(`${API_URL}/users`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        }
      )

      if (!response.ok) {
        throw new Error('failed to create account')
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({email, password}, {rejectWithValue}) => {
    try {
      const response = await fetch(`${API_URL}/users?email=${email}`);

      if(!response.ok) {
        throw new Error('failed to fetch user')
      }

      const users = await response.json()

      if(users.length === 0) {
        return rejectWithValue("Email not found")
      }

      const user = users[0];

      if(user.password === password) {
        return user
      } else {
        return rejectWithValue("Incorrect password")
      }

    } catch(error) {
       return rejectWithValue(error.message)
    }
  }
)

export const updateUserBalance = createAsyncThunk(
  'user/updateUserBalance',
  async ({userId, newBalance, orders}, {rejectWithValue}) => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          walletBalanceCents: newBalance,
          orders: orders
        })
      }
      )

      if (!response.ok) {
        throw new Error('failed to fetch user')
      }
      
      const updatedUser = await response.json()
      return updatedUser;

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  currentUser: initialUser, // Load from localStorage on refresh
  isLoading: false,
  error: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.error = null;
      state.isLoading = false;
      localStorage.removeItem('user'); // Clear localStorage on logout
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(signInUser.pending, (state) => {
      state.isLoading = true
    })
    .addCase(signInUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.currentUser = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload)); // Save on Signup
    })
    .addCase(signInUser.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    .addCase(loginUser.pending, (state) => {
      state.isLoading = true
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.currentUser = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload)); // Save on Login
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
    .addCase(updateUserBalance.pending, (state) => {
      state.isLoading = true
    })
    .addCase(updateUserBalance.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload)); 
    })
    .addCase(updateUserBalance.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    })
  }
})

export const { logout } = userSlice.actions;
export default userSlice.reducer;