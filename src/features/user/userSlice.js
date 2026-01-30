import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 1. API_URL
const API_URL = 'http://localhost:3000';

// function to create a new user
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
  currentUser: null,
  isLoading: false,
  error: null,
}

// create slice name userSlice with createSlice
// createSlice takes 3 parameters: name, initialState, reducers
// reducers is an object that contains the actions that will syncronously update the state
// define the actions that will update the state eg logout, updateProfile, etc.
// extraReducers is an object that contains the actions that will asynchronously update the state
// extraReducers is used to handle the async actions like signInUser, loginUser, etc. which takes a parameter
// builder is a parameter that is passed to the extraReducers function and is used to define the async actions
// addCase is a method that is used to define the async actions
// pending is a method that is used to define the async actions when they are pending
// fulfilled is a method that is used to define the async actions when they are fulfilled
// rejected is a method that is used to define the async actions when they are rejected


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.error = null
      state.isLoading = null
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
      state.currentUser = action.payload
    })
    .addCase(updateUserBalance.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    })
  }
})


export const { logout } = userSlice.actions;
export default userSlice.reducer;
