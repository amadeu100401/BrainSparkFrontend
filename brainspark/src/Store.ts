import { configureStore } from '@reduxjs/toolkit';
import { focusSlice } from './components/focus/slice/FocusSlice';

export const store = configureStore({
  reducer: {
    focus: focusSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
