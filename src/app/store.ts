import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { scrobbleDataReducer } from "components/upload/uploadSlice";
import { usernameReducer } from "components/username/userSlice";

export function makeStore() {
  return configureStore({
    reducer: { scrobbleData: scrobbleDataReducer, username: usernameReducer },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
