import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './AuthSlice';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from 'redux-persist';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
const persistedReducer = persistReducer(persistConfig, AuthSlice)

const store = configureStore({
reducer: {
    auth : persistedReducer,
},    
middleware: (getDefaultMiddleware : any) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store