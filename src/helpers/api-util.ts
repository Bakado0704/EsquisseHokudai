import { BuildingType, ProjectType, ToolType } from "@/types/category";
import { getDownloadURL, ref } from "firebase/storage";
import { useState, useCallback } from "react";
import storage from "./firebase";
import Post from "@/models/post";
import { StaticImageData } from "next/image";

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
      imageSource: (await getImage(data[key].image)).toString(),
      ...data[key],
    });
  }

  return posts;
}

//firebase上のesquissesを取得
export async function getAllEsquisses() {
  const response = await fetch(
    "https://react-getting-started-2a850-default-rtdb.firebaseio.com/esquisse.json"
  );
  const data = await response.json();

  const esquisses = [];

  for (const key in data) {
    esquisses.push({
      id: key,
      ...data[key],
    });
  }

  return esquisses;
}

export const getImage = async (image: StaticImageData) => {
  const res = await getDownloadURL(ref(storage, "image/" + image));
  return res;
};

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
