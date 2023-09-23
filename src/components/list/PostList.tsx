"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { BuildingType, ProjectType, ToolType } from "@/types/category";
import tagImg from "@/assets/icon/tag.svg";
import Post from "@/models/post";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { PostItem } from "../item/PostItem";

export default function PostList() {
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


            return (
              <PostItem key={post.id} post={post} tags={tags} />
            );
          })}
        </ul>
      )}
    </>
  );
}