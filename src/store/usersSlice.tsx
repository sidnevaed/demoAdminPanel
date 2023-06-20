import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  FormValuesEditing,
  GetUsersResponse,
  OneUserResponse,
  UsersStateType,
  UsersTypes,
} from "../interfaces/Interfaces";
import axios from "axios";

const initialState: UsersStateType = {
  users: [],
};

export const fetchUsers = createAsyncThunk("users/getUsers", async () => {
  const response = await axios.get<GetUsersResponse>(
    "https://super-game1-default-rtdb.firebaseio.com/usersV2.json",
  );

  return response.data;
});

export const editUser = createAsyncThunk(
  "users/editUser",
  async ({
    values,
    userId,
  }: {
    userId: UsersTypes["id"];
    values: FormValuesEditing;
  }) => {
    const result = await axios.patch<OneUserResponse>(
      `https://super-game1-default-rtdb.firebaseio.com/usersV2/${userId}.json`,
      values,
    );

    return result.data;
  },
);

export const usersSlice = createSlice({
  name: "usersLists",
  initialState,

  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<GetUsersResponse>) => {
          const users: UsersTypes[] = [];
          for (const [id, data] of Object.entries(action.payload)) {
            users.push({
              id,
              ...data,
            });
          }
          state.users = users;
        },
      )

      .addCase(editUser.fulfilled, (state, { meta, payload }) => {
        const user = state.users.find((user) => user.id === meta.arg.userId);
        if (!user) {
          throw new Error(`Пользователь с ID: ${meta.arg.userId} не найден`);
        }

        const newUser = {
          ...user,
          email: payload.email,
          firstName: payload.firstName,
          surname: payload.surname,
          openedORClosed: payload.openedORClosed,
        };

        state.users = [...state.users, newUser];
      });
  },
});

export default usersSlice.reducer;
