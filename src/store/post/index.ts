import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "./initialState";

const PostRedux = createSlice({
  name: "UserRedux",
  initialState,
  reducers: {
    IndicatePost: (state, posts) => {
      state.posts = posts.payload;
    },
    IndicateEsquisse: (state, esquisses) => {
      state.esquisses = esquisses.payload;
    },
    IndicateUser: (state, user) => {
      state.user = user.payload;
    },
    IndicateChangePost: (state, posts) => {
      state.user = posts.payload;
    },
  },
});

export const IndicatePost = PostRedux.actions.IndicatePost;
export const IndicateEsquisse = PostRedux.actions.IndicateEsquisse;
export const IndicateUser = PostRedux.actions.IndicateUser;
export const IndicateChangePost = PostRedux.actions.IndicateChangePost;
export default PostRedux.reducer;
