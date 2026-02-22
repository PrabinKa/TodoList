import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createMMKV } from 'react-native-mmkv';
import { persistReducer, persistStore, Storage } from 'redux-persist';
import { TokenReducer } from './slice/token';
import { UserDetailsReducer } from './slice/userDetails';
import { UsersListReducer } from './slice/usersList';


const reducers = combineReducers({
  token: TokenReducer,
  userDetails: UserDetailsReducer,
  usersList: UsersListReducer
});

const ENCRYPTION_KEY = 'secured_token';

export const storage = createMMKV({
  id: 'secured_token_storage',
  encryptionKey: ENCRYPTION_KEY,
});

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.remove(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: [
    'token',
    'userDetails',
    'usersList'
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;