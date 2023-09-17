"use client";

import Image from "next/image";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef } from "react";
import { BuildingType, ProjectType, ToolType } from "@/types/category";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  esquisseSubmit,
  getAllEsquisses,
  getAllPosts,
  getUser,
} from "@/helpers/api-util";
import { IndicateEsquisse, IndicatePost } from "@/store/post";
import NavHeader from "@/components/nav/NavHeader/NavHeader";

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
  const user = getUser();
  const changePostHandler = () => {};
  const deletePostHandler = () => {};
  const changeEsquisseHandler = () => {};
  const deleteEsquisseHandler = () => {};

  useEffect(() => {
    getAllPosts().then(function (result) {
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

    await esquisseSubmit(
      props.params.id,
      //@ts-ignore
      enteredText
    ).then(() => {
      getAllEsquisses().then(function (result) {
        dispatch(IndicateEsquisse(result));
      });
      // router.push("/home");
    })
  }

  return (
    <div>
      <NavHeader />
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
      {user && selectedPost.user.uid === user.uid && (
        <button onClick={changePostHandler}>変更</button>
      )}
      {user && selectedPost.user.uid === user.uid && (
        <button onClick={deletePostHandler}>消去</button>
      )}
      <h1>{selectedPost.title}</h1>
      <p>{selectedPost.user.displayName}</p>
      <p>{selectedPost.createdAt}</p>
      <Image src={selectedPost.imageSource} alt="" width={500} height={300} />
      <p>{selectedPost.description}</p>

      <ul>
        {selectedEsquisse.map((esquisse) => {
          return (
            <li key={esquisse.key}>
              {user && esquisse.user.uid === user.uid && (
                <button onClick={changeEsquisseHandler}>変更</button>
              )}
              {user && esquisse.user.uid === user.uid && (
                <button onClick={deleteEsquisseHandler}>消去</button>
              )}
              <p>{esquisse.user.displayName}</p>
              <p>{esquisse.description}</p>
            </li>
          );
        })}
      </ul>

      <form onSubmit={submitFormHandler}>
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
