import { category, dummyData } from "@/dummy-data/dummy-data";
import { BuildingType, ProjectType, ToolType } from "@/types/category";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: Params;
};

export default function Page(props: Props) {
  const postedId = props.params.id;
  const categoryTitle = category.find(
    (category) => category.id === BuildingType.housing
  )?.title;

  return (
    <div>
      <h1>{categoryTitle}</h1>
      <ul>
        {dummyData.map((dummyData) => {
          if (dummyData.category.buildingType === postedId) {
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
                    {dummyData.category.projectType && dummyData.category.projectType.map((data: ProjectType) => {
                      if(data) {
                        return (
                          <li key={data[0]}>
                            <Link href={`/esquisse/${data[0]}`}><p>{data[1]}</p></Link>
                          </li>
                        )
                      }
                    })}
                    {dummyData.category.buildingType && dummyData.category.buildingType.map((data: BuildingType) => {
                      if(data) {
                        return (
                          <li key={data[0]}>
                            <Link href={`/esquisse/${data[0]}`}><p>{data[1]}</p></Link>
                          </li>
                        )
                      }
                    })}
                    {dummyData.category.toolType && dummyData.category.toolType.map((data: ToolType) => {
                      if(data) {
                        return (
                          <li key={data[0]}>
                            <Link href={`/esquisse/${data[0]}`}><p>{data[1]}</p></Link>
                          </li>
                        )
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
