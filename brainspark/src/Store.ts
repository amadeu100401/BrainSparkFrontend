import { configureStore } from '@reduxjs/toolkit';
import { focusSlice } from './components/focus/slice/FocusSlice';
import focusClockSlice from './components/focus/slice/FocusClockSlice';

export const store = configureStore({
  reducer: {
    focus: focusSlice.reducer,
    focusClock: focusClockSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
