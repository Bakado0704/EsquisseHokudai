import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "./initialState";
import { getAllEvents } from "@/helpers/api-util";
import Post from "@/models/post";

const PostRedux = createSlice({
  name: "UserRedux",
  initialState,
  reducers: {
    IndicatePost: (state, posts) => {
      state.posts = posts.payload;
    },
  },
});

export const IndicatePost = PostRedux.actions.IndicatePost;
export default PostRedux.reducer;
