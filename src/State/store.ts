import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import reducers from "./Reducers";

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store  =  configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],
});



export const persistor = persistStore(store);
