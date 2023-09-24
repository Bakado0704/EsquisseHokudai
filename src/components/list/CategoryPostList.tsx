"use client";

import { BuildingType, ProjectType, ToolType } from "@/types/category";
import Post from "@/models/post";
import { PostItem } from "../item/PostItem";

type Props = {
  postedId: string;
  posts: Post[];
};

export const CategoryPostList = ({ postedId, posts }: Props) => {
  return (
    <>
      {posts && (
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
              return <PostItem key={post.id} post={post} tags={tags} />;
            }
          })}
        </ul>
      )}
    </>
  );
};
