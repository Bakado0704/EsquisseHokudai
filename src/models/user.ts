export default class User implements User {
  constructor(
    public uid: string,
    public displayName: string,
    public email: string,
    public login: boolean,
    public emailVerified: boolean,
  ) {
    this.displayName = displayName;
    this.uid = uid;
    this.email = email;
    this.login = login;
    this.emailVerified = emailVerified;
  }
}
