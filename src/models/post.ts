import Category from "./category";
import User from "./user";

//htmlImageElement

export default class Post implements Post {
  constructor(
    public id: string,
    public user: User,
    public createdAt: string,
    public title: string,
    public category: Category,
    public image: string,
    public description: string
  ) {
    this.id = id;
    this.user = user;
    this.createdAt = createdAt;
    this.title = title;
    this.category = category;
    this.image = image;
    this.description = description;
  }
}
