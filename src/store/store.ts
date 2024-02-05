import { configureStore } from '@reduxjs/toolkit'
import boardReducers from './slices/BoardSlice'

const store = configureStore({
  reducer: {
    board: boardReducers,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
