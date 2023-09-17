import User from "./user";

export default class Esquisse implements Esquisse {
  constructor(
    public id: string,
    public key: string,
    public user: User,
    public createdAt: string,
    public description: string
  ) {
    this.id = id;
    this.key = key;
    this.user = user;
    this.createdAt = createdAt;
    this.description = description;
  }
}
