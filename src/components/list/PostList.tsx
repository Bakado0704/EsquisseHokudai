"use client";

import { BuildingType, ProjectType, ToolType } from "@/types/category";
import Post from "@/models/post";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { PostItem } from "../item/PostItem";

export const PostList = () => {
  const posts = useSelector((state: RootState) => state.post.posts);

  return (
    <>
      {posts && (
        <ul>
          {posts.map((post: Post) => {
            let tags: (ProjectType | BuildingType | ToolType)[] = [];

            post.category.projectType?.map((data: ProjectType) => {
              tags.push(data);
            });

            post.category.buildingType?.map((data: BuildingType) => {
              tags.push(data);
            });

            post.category.toolType?.map((data: ToolType) => {
              tags.push(data);
            });

            return <PostItem key={post.id} post={post} tags={tags} />;
          })}
        </ul>
      )}
    </>
  );
}
