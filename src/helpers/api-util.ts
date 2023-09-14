import { BuildingType, ProjectType, ToolType } from "@/types/category";
import { useState, useCallback } from 'react';

//firebase上のpostsを取得
export async function getAllEvents() {
  const response = await fetch(
    "https://react-getting-started-2a850-default-rtdb.firebaseio.com/posts.json"
  );
  const data = await response.json();

  const posts = [];

  for (const key in data) {
    posts.push({
      id: key,
      ...data[key],
    });
  }

  return posts;
}

//抽出されたpostを返す
export async function getFeaturedEvents() {
  const allPosts = await getAllEvents();
  return allPosts.filter((post) => post.isFeatured);
}

//合致したpostを返す
export async function getEventById(id: string) {
  const allPosts = await getAllEvents();

  return allPosts.find((post) => post.id === id);
}

//カテゴリに合うpostsを返す
export async function getFilteredEvents(
  dataFilter: ProjectType | BuildingType | ToolType
) {
  const allPosts = await getAllEvents();

  let filteredPosts = allPosts.filter((post) => {
    return (
      post.ProjectType === dataFilter[0] ||
      post.BuildingType === dataFilter[0] ||
      post.ToolType === dataFilter[0]
    );
  });

  return filteredPosts;
}
