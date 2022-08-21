import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "@store";
import { LogEntry } from "models/Calendar";
import { User } from "models/User";

export interface UserState {
  value?: User;
  byDay?: LogEntry;
}

const initialState: UserState = {
  value: undefined,
};

export const userSlice = createSlice({
  name: "username",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
  },
});

export const { setUsername } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.username.value)`
export const selectUsername = (state: AppState) => state.username.value;

export const usernameReducer = userSlice.reducer;
