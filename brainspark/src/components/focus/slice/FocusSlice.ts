import { createSlice } from "@reduxjs/toolkit";

interface FocusState {
    resumeReloadTrigger: number;
}

const initialState: FocusState = {
    resumeReloadTrigger: Date.now()
}

export const focusSlice = createSlice({
    name: "focus",
    initialState,
    reducers: {
        triggerResumeReload: (state: FocusState) => {
            state.resumeReloadTrigger = Date.now();
        }
    }
})

export const { triggerResumeReload } = focusSlice.actions;
export default focusSlice.reducer;
