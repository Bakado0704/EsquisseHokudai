import Esquisse from "@/models/esquisse";
import Post from "@/models/post";

export type state = {
  posts: Post[];
  esquisses: Esquisse[];
};

const initialState: state = { posts: [], esquisses: [] };

export default initialState;
