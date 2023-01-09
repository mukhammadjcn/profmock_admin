import loginReducer from "./slices/login";
import collegeReducer from "./slices/user";
import { configureStore } from "@reduxjs/toolkit";
import applicationReducer from "./slices/application";

export const store = configureStore({
  reducer: {
    Login: loginReducer,
    User: collegeReducer,
    Application: applicationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
