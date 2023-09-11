import Category from "@/models/category";
import CategoryList from "@/models/categoryList";
import Esquisse from "@/models/esquisse";
import Post from "@/models/post";
import User from "@/models/user";
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

export const dummyData = [
  new Post(
    "c1",
    new User(
      "c1",
      "Bakado0704",
      "kado_hiroki@yahoo.co.jp",
      true,
      true,
      "kadoHiroki"
    ),
    "2023-09-08",
    "集合住宅の中間領域の作り方でエスキスをお願いします。",
    new Category([ProjectType.esquisse], [BuildingType.housingcomp], []),
    housingimg,
    "2年生後期の集合住宅の課題です。「食でつながる集合住宅」というコンセプトでデザインしまし、住宅の中に様々な食事スペース、キッチンを設け、住人同士の食を通じたつながりを生み出そうとしました。しかし学校のエスキスで、各住戸が分散しているが活動も分離してしまっては元も子もない。住人同士の交流の場として中間領域をもっと考えて設計したほうが良いとのアドバイスを受けました。自分の中では上手くやったつもりでしたが何が良くなかったのでしょう。アドバイスよろしくお願いします。"
  ),
  new Post(
    "c2",
    new User(
      "c2",
      "sato0805",
      "sato_takahumi@yahoo.co.jp",
      true,
      true,
      "satoTakahumi"
    ),
    "2023-09-07",
    "ダイアグラムとデザインコンセプトの違いは何でしょうか。",
    new Category([], [BuildingType.housingcomp], []),
    renovationimg,
    "2年生後期の集合住宅の課題です。「食でつながる集合住宅」というコンセプトでデザインしまし、住宅の中に様々な食事スペース、キッチンを設け、住人同士の食を通じたつながりを生み出そうとしました。しかし学校のエスキスで、各住戸が分散しているが活動も分離してしまっては元も子もない。住人同士の交流の場として中間領域をもっと考えて設計したほうが良いとのアドバイスを受けました。自分の中では上手くやったつもりでしたが何が良くなかったのでしょう。アドバイスよろしくお願いします。"
  ),
  new Post(
    "c3",
    new User(
      "c3",
      "suzuki0603",
      "suzuki_yuuta@yahoo.co.jp",
      true,
      true,
      "suzukiYuuta"
    ),
    "2023-09-06",
    "パースを作成時の背景の素材が欲しいのですが、おすすめのサイトはありますか。",
    new Category([ProjectType.assignment], [], []),
    churchimg,
    "2年生後期の集合住宅の課題です。「食でつながる集合住宅」というコンセプトでデザインしまし、住宅の中に様々な食事スペース、キッチンを設け、住人同士の食を通じたつながりを生み出そうとしました。しかし学校のエスキスで、各住戸が分散しているが活動も分離してしまっては元も子もない。住人同士の交流の場として中間領域をもっと考えて設計したほうが良いとのアドバイスを受けました。自分の中では上手くやったつもりでしたが何が良くなかったのでしょう。アドバイスよろしくお願いします。"
  ),
  new Post(
    "c4",
    new User(
      "c4",
      "saito0510",
      "saito_yutaka@yahoo.co.jp",
      true,
      true,
      "saitoYutaka"
    ),
    "2023-09-05",
    "図書館の設計。",
    new Category(
      [ProjectType.competition, ProjectType.esquisse],
      [BuildingType.library],
      []
    ),
    museumimg,
    "2年生後期の集合住宅の課題です。「食でつながる集合住宅」というコンセプトでデザインしまし、住宅の中に様々な食事スペース、キッチンを設け、住人同士の食を通じたつながりを生み出そうとしました。しかし学校のエスキスで、各住戸が分散しているが活動も分離してしまっては元も子もない。住人同士の交流の場として中間領域をもっと考えて設計したほうが良いとのアドバイスを受けました。自分の中では上手くやったつもりでしたが何が良くなかったのでしょう。アドバイスよろしくお願いします。"
  ),
];

export const esquisse = [
  new Esquisse(
    "c1",
    new User(
      "c5",
      "isizuki0807",
      "isizuki_kentaro@yahoo.co.jp",
      true,
      true,
      "isizukiKentaro"
    ),
    "2023-09-05",
    "住戸にもっと角度をつけて重ねてみてはどうでしょうか。そうすることで角度をふった部分にスペースが生まれ、住民の活動がそとに出てくるので上手く外部とつながりをもてる中間領域になると思います。また、学生の設計課題なので構造についてはあまり考えなくて良いです。自由な発想でデザインしてみて下さい。"
  ),
  new Esquisse(
    "c1",
    new User(
      "c6",
      "hamano1212",
      "hamano_kentaro@yahoo.co.jp",
      true,
      true,
      "hamanokentaro"
    ),
    "2023-09-04",
    "共有部分となるキッチンや食事スペース部分に住戸をつけてみては。そうすると半強制的ではありますが、住民は自身の住戸へ行く際に必ず共有部分を通るので、あなたがコンセプトにかかげている「自然な食のつながり」をつくれるのではないでしょうか。参考事例として、「ヨコハマアパートメント」「BonusTrack」などを見てみるのも良いかもしれません。"
  ),
];

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