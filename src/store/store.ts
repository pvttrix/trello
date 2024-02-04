import { configureStore } from '@reduxjs/toolkit'
import boardReducers from './slices/BoardSlice'
const store = configureStore({
  reducer: {
    board: boardReducers,
  },
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store
