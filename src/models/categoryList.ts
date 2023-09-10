import { BuildingType } from "@/types/category";
import { StaticImageData } from "next/image";

export default class CategoryList implements CategoryList {
  constructor(
    public id : BuildingType,
    public image: StaticImageData,
    public title: string,
  ) {
    this.id = id;
    this.image = image;
    this.title = title;
  }
}