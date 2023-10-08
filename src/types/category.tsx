export type Category = {
  projectType: ProjectType[] | undefined;
  buildingType: BuildingType[] | undefined;
  toolType: ToolType[] | undefined;
};

export const ProjectType = {
  esquisse: ["esquisse", "エスキス"],
  assignment: ["assignment", "設計課題"],
  graduation: ["guraduation", "卒業設計"],
  competition: ["competition", "コンペ"],
  independent: ["independent", "自主設計"],
} as const;
export type ProjectType = (typeof ProjectType)[keyof typeof ProjectType];

export const BuildingType = {
  housing: ["housing", "住宅"],
  station: ["station", "中島公園駅"],
  housingcomp: ["housingcomp", "集合住宅"],
  school: ["school", "小中学校"],
  library: ["library", "図書館"],
  structure: ["structure", "構造"],
  renovation: ["renovation", "リノべーション"],
  university: ["university", "国際戦略拠点"],
  museum: ["museum", "小別沢・美術館"],
} as const;
export type BuildingType = (typeof BuildingType)[keyof typeof BuildingType];

export const ToolType = {
  illustrator: ["illustrator", "illustrator"],
  photoshop: ["photoshop", "photoshop"],
  archicad: ["archicad", "archicad"],
  autocad: ["autocad", "autocad"],
  rhinoceros: ["rhinoceros", "rhinoceros"],
  vectorworks: ["vectorworks", "vectorworks"],
  revit: ["revit", "revit"],
  sketchup: ["sketchup", "sketchup"],
  blender: ["blender", "blender"],
  lumion: ["lumion", "lumion"],
  twinmotion: ["twinmotion", "twinmotion"],
} as const;
export type ToolType = (typeof ToolType)[keyof typeof ToolType];
