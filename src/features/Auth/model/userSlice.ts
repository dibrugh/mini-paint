import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    displayName: null,
    email: null,
    isLoading: true,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.displayName = action.payload.displayName;
            state.email = action.payload.email;
            state.isLoading = false;
        },
        removeUser(state) {
            state.displayName = null;
            state.email = null;
            state.isLoading = false;
        },
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
    },
});

export const { setUser, removeUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
