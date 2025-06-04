import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FocusClockState {
  startedAt: string | null;
  isRunning: boolean;
  state: 'idle' | 'running' | 'paused' | 'stopped';
  isPaused: boolean;
}

const initialState: FocusClockState = {
  startedAt: null,
  isRunning: false,
  state: 'idle',
  isPaused: false,
};

const focusClockSlice = createSlice({
  name: 'focusClock',
  initialState,
  reducers: {
    startFocus(state) {
      console.log("startFocus");
      state.startedAt = new Date().toISOString();
      state.isRunning = true;
      state.state = 'running';
    },
    pauseFocus(state) {
      state.isRunning = false;
      state.state = 'paused';
      state.isPaused = true;
    },
    resetFocus(state) {
      state.startedAt = null;
      state.isRunning = false;
      state.state = 'idle';
    },
    stopFocus(state) {
      state.isRunning = false;
      state.state = 'stopped';
    },
  },
});

export const { startFocus, pauseFocus, resetFocus, stopFocus } = focusClockSlice.actions;
export default focusClockSlice.reducer;
