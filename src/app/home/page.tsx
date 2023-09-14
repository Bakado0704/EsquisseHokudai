"use client";

import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { dummyData } from "@/dummy-data/dummy-data";
import Image, { StaticImageData } from "next/image";
import styled, { css } from "styled-components";
import { BuildingType, ProjectType, ToolType } from "@/types/category";
import { useEffect, useState } from "react";
import { IndicatePost } from "@/store/post";
import { RootState } from "@/store/store";
import { getAllEvents } from "@/helpers/api-util";
import Post from "@/models/post";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import storage from "@/helpers/firebase";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function Page() {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.post.posts);
  let imageSources: {
    imageSource: string;
    id: string;
  }[] = [];

  useEffect(() => {
    getAllEvents().then(function (result) {
      dispatch(IndicatePost(result));
    });
  }, [dispatch]);

  if (!posts) {
    <p>Loading...</p>;
  }

  // for (let i = 0; i < posts.length; i++) {
  //   getDownloadURL(ref(storage, "image/" + posts[i].image))
  //     .then((url) => {
  //       imageSources.push({ imageSource: url, id: posts[i].id });
  //     })
  //     .catch((error) => {});
  // }

  return (
    <div>
      <h1>ホーム</h1>
      {posts && (
        <ul>
          {posts.map((post) => {
            let tags: (ProjectType | BuildingType | ToolType)[] = [];

            //集合配列tagについて
            post.category.projectType?.map((data) => {
              tags.push(data);
            });

            post.category.buildingType?.map((data) => {
              tags.push(data);
            });

            post.category.toolType?.map((data) => {
              tags.push(data);
            });

            return (
              <li key={post.id}>
                <Link href={`/esquisse/${post.id}`}>
                  {/* <Image
                    src={imageSources.find((source) => source.id === post.id)?.imageSource}
                    alt={`${post.image}`}
                    width={300}
                    height={200}
                  /> */}
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
                  <p>{post.title}</p>
                  <p>{post.user.username}</p>
                  <p>{post.createdAt}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      <Link href="/post">投稿する</Link>
    </div>
  );
}

const Button = styled.button<{ $primary?: boolean }>`
  --accent-color: red;

  /* This renders the buttons above... Edit me! */
  background: transparent;
  border-radius: 3px;
  border: 1px solid var(--accent-color);
  color: var(--accent-color);
  display: inline-block;
  margin: 0.5rem 1rem;
  padding: 0.5rem 0;
  transition: all 200ms ease-in-out;
  width: 11rem;

  &:hover {
    filter: brightness(0.85);
  }

  &:active {
    filter: brightness(1);
  }

  /* The GitHub button is a primary button
   * edit this to target it specifically! */
  ${(props) =>
    props.$primary &&
    css`
      background: var(--accent-color);
      color: black;
    `}
`;
