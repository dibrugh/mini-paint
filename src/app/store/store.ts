import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../features/Auth/model/userSlice';
import imageReducer from '../../features/ImagesCRUD/model/imageSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        image: imageReducer,
    },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
