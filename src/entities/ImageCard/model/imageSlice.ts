import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    documentId: null,
    email: null,
    id: null,
    image: null,
    name: null,
};

const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        setImage(state, action) {
            state.documentId = action.payload.documentId;
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.image = action.payload.image;
            state.name = action.payload.name;
        },
    },
});

export const { setImage } = imageSlice.actions;
export default imageSlice.reducer;
