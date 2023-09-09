export default class CategoryList implements CategoryList {
  constructor(
    public image: string,
    public title: string,
  ) {
    this.image = image;
    this.title = title;
  }
}
