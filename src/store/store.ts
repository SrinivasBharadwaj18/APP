import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from '../features/token/tokenSlice'



export const store = configureStore({
    reducer: {
        tokenizer: tokenReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch