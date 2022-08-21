import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "@store";
import { LogEntry } from "models/Calendar";
import { SimplifiedTrack, Track } from "models/ScrobblePage";

export interface ScrobbleDataState {
  value: SimplifiedTrack[];
  byDay?: LogEntry;
  status: "idle" | "loading" | "failed";
}

const initialState: ScrobbleDataState = {
  value: [],
  status: "idle",
};

export const scrobbleDataSlice = createSlice({
  name: "scrobbleData",
  initialState,
  reducers: {
    setScrobbles: (state, action: PayloadAction<Track[]>) => {
      const tracks: SimplifiedTrack[] = action.payload.map(SimplifiedTrack);
      state.value = tracks;
    },
    addScrobbles: (state, action: PayloadAction<Track[]>) => {
      const tracks: SimplifiedTrack[] = action.payload.map(SimplifiedTrack);
      state.value = [...state.value, ...tracks];
    },
    setByDay: (state, action: PayloadAction<{}>) => {
      state.byDay = action.payload;
    },
  },
});

export const { setScrobbles, addScrobbles, setByDay } =
  scrobbleDataSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.scrobbleData.value)`
export const selectScrobbleData = (state: AppState) => state.scrobbleData.value;
export const selectScrobbleDataStatus = (state: AppState) =>
  state.scrobbleData.status;
export const selectScrobbleByDay = (state: AppState) =>
  state.scrobbleData.byDay;

export const scrobbleDataReducer = scrobbleDataSlice.reducer;
