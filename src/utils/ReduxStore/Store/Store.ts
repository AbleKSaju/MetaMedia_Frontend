import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Slice/userSlice";
import tokenSlice from "../Slice/tokenSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};
const persistedUserReducer = persistReducer(persistConfig, userSlice);
const persistedTokenReducer = persistReducer(persistConfig, tokenSlice);

const Store = configureStore({
  reducer: {
    user: persistedUserReducer,
    token: persistedTokenReducer,
  },
});

const persistor = persistStore(Store);
export { Store, persistor };
