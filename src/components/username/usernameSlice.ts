import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "@store";
import { LogEntry } from "models/Calendar";
import { User } from "models/User";

export interface UsernameState {
  value?: User;
  byDay?: LogEntry;
  status: "idle" | "loading" | "failed";
}

const initialState: UsernameState = {
  value: undefined,
  status: "idle",
};

export const usernameSlice = createSlice({
  name: "username",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
  },
});

export const { setUsername } = usernameSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.username.value)`
export const selectUsername = (state: AppState) => state.username.value;

export const usernameReducer = usernameSlice.reducer;
