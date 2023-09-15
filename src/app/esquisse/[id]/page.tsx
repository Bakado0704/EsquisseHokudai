"use client";

import Image from "next/image";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef } from "react";
import { BuildingType, ProjectType, ToolType } from "@/types/category";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getAllEsquisses, getAllEvents } from "@/helpers/api-util";
import { IndicateEsquisse, IndicatePost } from "@/store/post";

type Props = {
  params: Params;
};

function Esquisse(props: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const textInputRef = useRef<HTMLInputElement | null>(null);
  const postedId = props.params.id;
  const posts = useSelector((state: RootState) => state.post.posts);
  const esquisses = useSelector((state: RootState) => state.post.esquisses);
  const selectedPost = posts.find((post) => post.id === postedId);
  const selectedEsquisse = esquisses.filter(
    (esquisse) => esquisse.id === postedId
  );

  useEffect(() => {
    getAllEvents().then(function (result) {
      dispatch(IndicatePost(result));
    });
    getAllEsquisses().then(function (result) {
      dispatch(IndicateEsquisse(result));
    });
  }, [dispatch]);

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

  async function submitFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredText = textInputRef.current?.value;

    const reqBody = {
      id: props.params.id,
      description: enteredText,
      createdAt: new Date().toDateString(),
      user: {
        id: "c1",
        username: "Bakado0704",
        email: "kado_hiroki@yahoo.co.jp",
        login: true,
        emailVerified: true,
        passwordHashed: "KadoHiroki",
      },
    };

    console.log(reqBody);

    await fetch(
      "https://react-getting-started-2a850-default-rtdb.firebaseio.com/esquisse.json",
      {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => response.json());
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
        <Image src={selectedPost.imageSource} alt="" width={500} height={300} />
        <p>{selectedPost.description}</p>

        <ul>
          {selectedEsquisse.map((esquisse) => {
            return (
              <li key={esquisse.createdAt}>
                <p>{esquisse.user.username}</p>
                <p>{esquisse.description}</p>
              </li>
            );
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

export default Esquisse;
