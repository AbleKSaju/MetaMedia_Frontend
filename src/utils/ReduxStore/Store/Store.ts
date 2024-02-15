
import {configureStore} from '@reduxjs/toolkit'
import userSlice from '../Slice/userSlice'
import tokenSlice from '../Slice/tokenSlice'
import {combineReducers } from '@reduxjs/toolkit'
import { persistReducer ,persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storySlice from '../Slice/storySlice';


const persistConfig = {
    key: 'root',
    whitelist: ['user','token','story'],
    storage,
  };

  const reducer= combineReducers({
    user:userSlice,
    story:storySlice,
    token:tokenSlice
  })
  
  const persistedReducer = persistReducer(persistConfig, reducer);



const Store=configureStore({
    reducer:{
       persisted:persistedReducer
    }
})


const persistor = persistStore(Store);
export { Store, persistor };
