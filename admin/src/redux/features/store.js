import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { indexSlice } from "../indexSlice";
import userReducer from "./authstate";
import { districtApi } from "./districtSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedReducer,
    [indexSlice.reducerPath]: indexSlice.reducer,
    [districtApi.reducerPath]: districtApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(indexSlice.middleware),
});

export const persistor = persistStore(store);
export default store;
