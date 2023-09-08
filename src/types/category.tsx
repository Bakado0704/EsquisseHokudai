export type Category = {
  projectType: ProjectType[] | undefined;
  buildingType: BuildingType[] | undefined;
  toolType: ToolType[] | undefined;
};

export const ProjectType = {
  esquisse: "エスキス",
  assignment: "設計課題",
  graduation: "卒業設計",
  competition: "コンペ",
  independent: "自主設計",
} as const;
export type ProjectType = (typeof ProjectType)[keyof typeof ProjectType];

export const BuildingType = {
  housing: "住宅",
  housingcomp: "集合住宅",
  school: "小中学校",
  library: "図書館",
  university: "大学キャンパス",
  museum: "美術館",
  kindergarten: "幼稚園",
  church: "教会",
} as const;
export type BuildingType = (typeof BuildingType)[keyof typeof BuildingType];

export const ToolType = {
  illustrator: "illusurator",
  photoshop: "photoshop",
  archicad: "archicad",
  autocad: "autocad",
  rhinoceros: "rhinoceros",
  vectorworks: "vectorworks",
  revit: "revit",
  sketchup: "sketchup",
  blender: "blender",
  lumion: "lumion",
  twinmotion: "twinmotion",
} as const;
export type ToolType = (typeof ToolType)[keyof typeof ToolType];
