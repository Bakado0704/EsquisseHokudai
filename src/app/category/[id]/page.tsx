import { buildingCategory, dummyData, projectCategory, toolCategory } from "@/dummy-data/dummy-data";
import CategoryList from "@/models/categoryList";
import { BuildingType, ProjectType, ToolType } from "@/types/category";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: Params;
};

export default function Page(props: Props) {
  const postedId = props.params.id;

  let tags: (CategoryList)[] = [];
  //集合配列tagについて
  buildingCategory?.map((data) => {
    tags.push(data);
  });
  projectCategory?.map((data) => {
    tags.push(data);
  });
  toolCategory?.map((data) => {
    tags.push(data);
  });

  const categoryTitle = tags.find(
    (category) => category.id[0] === postedId
  )?.title;

  return (
    <div>
      <h1>{categoryTitle}</h1>
      <ul>
        {dummyData.map((dummyData) => {
          let tags: (ProjectType | BuildingType | ToolType)[] = [];
          let selectedtags: string[] = [];

          //集合配列tagについて
          dummyData.category.projectType?.map((data) => {
            tags.push(data);
            selectedtags.push(data[0]);
          });
          dummyData.category.buildingType?.map((data) => {
            tags.push(data);
            selectedtags.push(data[0]);
          });
          dummyData.category.toolType?.map((data) => {
            tags.push(data);
            selectedtags.push(data[0]);
          });

          if (selectedtags.includes(postedId)) {
            return (
              <li key={dummyData.id}>
                <Link href={`/esquisse/${dummyData.id}`}>
                  <Image
                    src={dummyData.image}
                    alt=""
                    width={300}
                    height={200}
                  />
                  <ul>
                    {tags &&
                      tags.map((data) => {
                        if (data) {
                          return (
                            <li key={data[0]}>
                              <p>{data[1]}</p>
                            </li>
                          );
                        }
                      })}
                  </ul>
                  <p>{dummyData.title}</p>
                  <p>{dummyData.user.username}</p>
                  <p>{dummyData.createdAt}</p>
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
