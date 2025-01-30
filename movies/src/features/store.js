import { configureStore } from '@reduxjs/toolkit';
import filmReducer from './filmSlice';

export default configureStore({
    reducer: {
        film: filmReducer
    }
});
