import { BuildingType, ProjectType, ToolType } from "@/types/category";
import { StaticImageData } from "next/image";

export default class CategoryList implements CategoryList {
  constructor(
    public id : BuildingType | ProjectType | ToolType,
    public image: StaticImageData | undefined,
    public title: string,
  ) {
    this.id = id;
    this.image = image;
    this.title = title;
  }
}