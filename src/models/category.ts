import { BuildingType, ProjectType, ToolType } from "@/types/category";

export default class Category implements Category {
  constructor(
    public projectType: ProjectType[] | undefined,
    public buildingType: BuildingType[] | undefined,
    public toolType: ToolType[] | undefined
  ) {
    this.projectType = projectType;
    this.buildingType = buildingType;
    this.toolType = toolType;
  }
}
