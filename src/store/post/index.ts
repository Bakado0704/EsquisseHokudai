import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "./initialState";
import Post from "@/models/post";

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
  },
});

export const IndicatePost = PostRedux.actions.IndicatePost;
export const IndicateEsquisse = PostRedux.actions.IndicateEsquisse;
export default PostRedux.reducer;
