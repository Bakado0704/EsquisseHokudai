import Esquisse from "@/models/esquisse";
import Post from "@/models/post";
import User from "@/models/user";

export type state = {
  posts: Post[];
  esquisses: Esquisse[];
  user: User;
  changePost: Post[];
};

const initialState: state = {
  posts: [],
  esquisses: [],
  user: {
    uid: "",
    displayName: "",
    email: "",
    login: false,
    emailVerified: false,
  },
  changePost: [],
};

export default initialState;
