import Post from "@/models/post";

export type state = {
  posts: Post[];
};

const initialState: state = { posts: [] };

export default initialState;
