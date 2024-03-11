import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Slice/userSlice";
import tokenSlice from "../Slice/tokenSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import storySlice from "../Slice/storySlice";
import highlightSlice from "../Slice/highlightSlice";
import postSlice from "../Slice/postSlice";
import singlePostSlice from "../Slice/singlePostSlice";
import messageSlice from "../Slice/messageSlice";
import liveSlice from "../Slice/liveSlice";
const persistConfig = {
  key: "root",
  whitelist: ["user", "token", "story", "highlight", 'post','singlePost','message','live'],
  storage,
};

const reducer = combineReducers({
  user: userSlice,
  story: storySlice,
  token: tokenSlice,
  highlight: highlightSlice,
  message: messageSlice,
  post:postSlice,
  singlePost:singlePostSlice,
  live:liveSlice
});

const persistedReducer = persistReducer(persistConfig, reducer);

const Store = configureStore({
  reducer: {
    persisted: persistedReducer,
  },
});

const persistor = persistStore(Store);
export { Store, persistor };
