import {configureStore} from '@reduxjs/toolkit';
import playerReducer from '../store/playerSlice';

export default configureStore({
    reducer: {
        player: playerReducer,
    },
})