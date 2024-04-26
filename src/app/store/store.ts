import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../widgets/SignIn/model/userSlice';
import imageReducer from '../../entities/ImageCard/model/imageSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        image: imageReducer,
    },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
