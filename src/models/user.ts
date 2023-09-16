export default class User implements User {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public login: boolean,
    public emailVerified: boolean,
  ) {
    this.username = username;
    this.id = id;
    this.email = email;
    this.login = login;
    this.emailVerified = emailVerified;
  }
}
