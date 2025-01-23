import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isDarkMode: false, // Initial state: Light Mode
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export const apptheme = (state) => state.theme.isDarkMode
export default themeSlice.reducer;