"use client"

import { buildingCategory, projectCategory, toolCategory } from "@/categoryData/categoryData";
import NavHeader from "@/components/nav/NavHeader/NavHeader";
import { getAllPosts } from "@/helpers/api-util";
import CategoryList from "@/models/categoryList";
import { IndicatePost } from "@/store/post";
import { RootState } from "@/store/store";
import { BuildingType, ProjectType, ToolType } from "@/types/category";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  params: Params;
};

export default function Page(props: Props) {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.post.posts);

  useEffect(() => {
    getAllPosts().then(function (result) {
      dispatch(IndicatePost(result));
    });
  }, [dispatch]);

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
      <NavHeader />
      <h1>{categoryTitle}</h1>
      <ul>
        {posts.map((post) => {
          let tags: (ProjectType | BuildingType | ToolType)[] = [];
          let selectedtags: string[] = [];

          //集合配列tagについて
          post.category.projectType?.map((data) => {
            tags.push(data);
            selectedtags.push(data[0]);
          });
          post.category.buildingType?.map((data) => {
            tags.push(data);
            selectedtags.push(data[0]);
          });
          post.category.toolType?.map((data) => {
            tags.push(data);
            selectedtags.push(data[0]);
          });

          if (selectedtags.includes(postedId)) {
            return (
              <li key={post.id}>
                <Link href={`/esquisse/${post.id}`}>
                  <Image
                    src={post.imageSource}
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
                  <h1>{post.title}</h1>
                  <p>{post.user.username}</p>
                  <p>{post.createdAt}</p>
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
