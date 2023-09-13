"use client";

import Image from "next/image";
import { dummyData, esquisse } from "@/dummy-data/dummy-data";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";
import { BuildingType, ProjectType, ToolType } from "@/types/category";
import Link from "next/link";
import { getAllEvents } from "@/helpers/api-util";

type Props = {
  params: Params;
};

function ProductDetailPage(props: Props) {
  const router = useRouter();
  const textInputRef = useRef<HTMLInputElement | null>(null);
  const postedId = props.params.id;

  const selectedPost = dummyData.find((post) => post.id === postedId);

  if (!selectedPost) {
    return <p>Loading...</p>;
  }

  let tags: (ProjectType | BuildingType | ToolType)[] = [];

  //集合配列tagについて
  selectedPost.category.projectType?.map((data) => {
    tags.push(data);
  });
  selectedPost.category.buildingType?.map((data) => {
    tags.push(data);
  });
  selectedPost.category.toolType?.map((data) => {
    tags.push(data);
  });

  function submitFormHandler(event: FormEvent<HTMLFormElement>) {
    // event.preventDefault();

    router.push(`/esquisse/${postedId}`);
  }

  return (
    <div>
      <form onSubmit={submitFormHandler}>
        <ul>
          {tags.map((data) => {
            if (data) {
              return (
                <li key={data[0]}>
                  <Link href={`/category/${data[0]}`}>
                    <p>{data[1]}</p>
                  </Link>
                </li>
              );
            }
          })}
        </ul>
        <h1>{selectedPost.title}</h1>
        <p>{selectedPost.user.username}</p>
        <p>{selectedPost.createdAt}</p>
        <Image src={selectedPost.image} alt="" width={500} height={300} />
        <p>{selectedPost.description}</p>

        <ul>
          {esquisse.map((esquisse) => {
            if (esquisse.id === postedId) {
              return (
                <li key={esquisse.createdAt}>
                  <p>{esquisse.user.username}</p>
                  <p>{esquisse.text}</p>
                </li>
              );
            }
          })}
        </ul>

        <div>
          <label htmlFor="text">コメントを追加する。</label>
          <input type="text" id="text" ref={textInputRef} />
        </div>
        <button>メッセージを投稿する</button>
      </form>
    </div>
  );
}

// async function getData() {
//   const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
//   const jsonData = await fs.readFile(filePath);
//   const data = JSON.parse(jsonData);

//   return data;
// }

// async function getStaticProps() {
//   const allDatas = await getAllEvents();

//   return allDatas;
// }

// export async function getStaticPaths() {
//   const data = await getData();

//   const ids = data.products.map((product) => product.id);

//   const pathWithParams = ids.map((id) => ({ params: { pid: id } }));

//   return {
//     paths: pathWithParams,
//     fallback: true,
//   };
// }

export default ProductDetailPage;
