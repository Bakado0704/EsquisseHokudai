import logo from "../assets/works/esquisse.png";
import Category from "@/models/category";
import Post from "@/models/post";
import User from "@/models/user";
import { BuildingType, ProjectType, ToolType } from "@/types/category";

export const dummyData = [
  new Post(
    "c1",
    new User(
      "c1",
      "Bakado0704",
      "kado_hiroki@eis.hokudai.ac.jp",
      true,
      true,
      "satoTakahumi"
    ),
    "2023-09-08",
    "集合住宅の中間領域の作り方でエスキスをお願いします。",
    new Category(ProjectType.esquisse, BuildingType.housingcomp, undefined),
    "../assets/works/esquisse.png",
    "2年生後期の集合住宅の課題です。「食でつながる集合住宅」というコンセプトでデザインしまし、住宅の中に様々な食事スペース、キッチンを設け、住人同士の食を通じたつながりを生み出そうとしました。しかし学校のエスキスで、各住戸が分散しているが活動も分離してしまっては元も子もない。住人同士の交流の場として中間領域をもっと考えて設計したほうが良いとのアドバイスを受けました。自分の中では上手くやったつもりでしたが何が良くなかったのでしょう。アドバイスよろしくお願いします。"
  ),
];
