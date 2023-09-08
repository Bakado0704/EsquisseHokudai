import User from "./user";

export default class Esquisse implements Esquisse {
  constructor(
    public id : string,
    public user: User,
    public createdAt: string,
    public text: string
  ) {
    this.id = id;
    this.user = user;
    this.createdAt = createdAt;
    this.text = text;
  }
}
