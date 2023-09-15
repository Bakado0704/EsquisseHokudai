import CategoryList from "@/models/categoryList";
import { BuildingType, ProjectType, ToolType } from "@/types/category";
import housingimg from "@/assets/category/housing.jpg";
import housingcompimg from "@/assets/category/housing-comp.jpg";
import schoolimg from "@/assets/category/school.jpg";
import libraryimg from "@/assets/category/library.jpg";
import universityimg from "@/assets/category/university.jpg";
import museumimg from "@/assets/category/museum.jpg";
import kindergartenimg from "@/assets/category/kindergarten.jpg";
import churchimg from "@/assets/category/church.jpg";
import renovationimg from "@/assets/category/renovation.jpg";

export const buildingCategory = [
  new CategoryList(BuildingType.housing, housingimg, "住宅"),
  new CategoryList(BuildingType.housingcomp, housingcompimg, "集合住宅"),
  new CategoryList(BuildingType.school, schoolimg, "小中学校"),
  new CategoryList(BuildingType.library, libraryimg, "図書館"),
  new CategoryList(BuildingType.university, universityimg, "大学キャンパス"),
  new CategoryList(BuildingType.museum, museumimg, "美術館"),
  new CategoryList(BuildingType.kindergarten, kindergartenimg, "幼稚園"),
  new CategoryList(BuildingType.church, churchimg, "教会"),
  new CategoryList(BuildingType.renovation, renovationimg, "リノベーション"),
];

export const projectCategory = [
  new CategoryList(ProjectType.assignment, undefined, "設計課題"),
  new CategoryList(ProjectType.competition, undefined, "コンペ"),
  new CategoryList(ProjectType.esquisse, undefined, "エスキス"),
  new CategoryList(ProjectType.graduation, undefined, "卒業設計"),
  new CategoryList(ProjectType.independent, undefined, "自主設計"),
];

export const toolCategory = [
  new CategoryList(ToolType.archicad, undefined, "archicad"),
  new CategoryList(ToolType.autocad, undefined, "autocad"),
  new CategoryList(ToolType.blender, undefined, "blender"),
  new CategoryList(ToolType.illustrator, undefined, "illudtrator"),
  new CategoryList(ToolType.lumion, undefined, "lumion"),
  new CategoryList(ToolType.photoshop, undefined, "photoshop"),
  new CategoryList(ToolType.revit, undefined, "revit"),
  new CategoryList(ToolType.rhinoceros, undefined, "rhinoceros"),
  new CategoryList(ToolType.sketchup, undefined, "sketchup"),
  new CategoryList(ToolType.twinmotion, undefined, "twinmotion"),
  new CategoryList(ToolType.vectorworks, undefined, "vectorworks"),
];
