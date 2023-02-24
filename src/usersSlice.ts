import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User, getUsers, addUser, updateUser, deleteUser } from "./db";

interface UserState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  users: [],
  status: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await getUsers();
  return response;
});

export const addNewUser = createAsyncThunk("users/addNewUser", async (user: User) => {
  const response = await addUser(user);
  return response;
});

export const updateUserById = createAsyncThunk("users/updateUserById", async (user: User) => {
  const response = await updateUser(user);
  return response;
});

export const deleteUserById = createAsyncThunk("users/deleteUserById", async (id: string) => {
  await deleteUser(id);
  return id;
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        const userIndex = state.users.findIndex((user) => user.id === action.payload.id);
        if (userIndex !== -1) {
          state.users[userIndex] = action.payload;
        }
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        const id = action.payload;
        state.users = state.users.filter((user) => user.id !== id);
      });
  },
});

export const selectAllUsers = (state: { users: UserState }) => state.users.users;

export default userSlice.reducer;
