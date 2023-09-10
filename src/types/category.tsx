export type Category = {
  projectType: ProjectType[] | undefined;
  buildingType: BuildingType[] | undefined;
  toolType: ToolType[] | undefined;
};

export const ProjectType = {
  esquisse: ["esquisse","エスキス"],
  assignment: ["assignment","設計課題"],
  graduation: ["guraduation","卒業設計"],
  competition: ["competition","コンペ"],
  independent: ["independent","自主設計"],
} as const;
export type ProjectType = (typeof ProjectType)[keyof typeof ProjectType];

export const BuildingType = {
  housing: ["housing","住宅"],
  housingcomp: ["housingcomp","集合住宅"],
  school: ["school","小中学校"],
  library: ["library","図書館"],
  university: ["university","大学キャンパス"],
  museum: ["museum","美術館"],
  kindergarten: ["kindergarten","幼稚園"],
  church: ["church","教会"],
  renovation: ["renovation","リノべーション"]
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
