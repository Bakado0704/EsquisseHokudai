import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "./initialState";
import Post from "@/models/post";

const PostRedux = createSlice({
  name: "UserRedux",
  initialState,
  reducers: {
    IndicatePost: (state, action: PayloadAction<number>) => {
        console.log(action)
    },
  },
});

export const IndicatePost = PostRedux.actions.IndicatePost;
export default PostRedux.reducer;
