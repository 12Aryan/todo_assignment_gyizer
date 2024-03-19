import { configureStore } from '@reduxjs/toolkit'
import todoSlice from '../redux/TodoSlice'

export const store = configureStore({
  reducer: {
    todoSlice: todoSlice
  },
})