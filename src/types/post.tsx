import { Category } from "./category";
import { User } from "./user";

export type Post = {
  id: string;
  user: User;
  createdAt: string;
  title: string;
  category: Category;
  image: string;
  description: string;
}
