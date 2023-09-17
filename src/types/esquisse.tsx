import { User } from "./user";

export type Esquisse = {
  id: string;
  key: string;
  user: User;
  createdAt: string;
  description: string;
};
