import {configureStore} from '@reduxjs/toolkit'
import userSlice from '../Slice/userSlice'

const Store=configureStore({
    reducer:{
        user:userSlice
    }
})


export default Store