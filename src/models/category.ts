import { BuildingType, ProjectType, ToolType } from "@/types/category";

// let projectType;

// switch (type) {
//   case "山川製作所": {
//     projectType = ProjectType[1];
//     break;
//   }
//   case "蒼月": {
//     playpattern = PATTERN_DATES[1];
//     break;
//   }
//   case "アッシュベリーInc": {
//     playpattern = PATTERN_DATES[0];
//     break;
//   }
//   case "オリジン弁太郎": {
//     playpattern = PATTERN_DATES[0];
//     break;
//   }
//   case "アグロン精密": {
//     playpattern = PATTERN_DATES[0];
//     break;
//   }
//   case "スターフーズ": {
//     playpattern = PATTERN_DATES[0];
//     break;
//   }
//   case "鹿賀水産": {
//     playpattern = PATTERN_DATES[0];
//     break;
//   }
//   case "玉津アーセナル": {
//     playpattern = PATTERN_DATES[0];
//     break;
//   }
//   case "小篠建設": {
//     playpattern = PATTERN_DATES[0];
//     break;
//   }
//   case "タナベ建設": {
//     playpattern = PATTERN_DATES[0];
//     break;
//   }
// }


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

