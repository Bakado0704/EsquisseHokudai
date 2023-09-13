import { configureStore } from "@reduxjs/toolkit";

import PostReducer from "./post/index";

export const store = configureStore({
  reducer: {
    post: PostReducer,
  },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
});

export type RootState = ReturnType<typeof store.getState>;
