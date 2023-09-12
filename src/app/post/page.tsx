"use client";

import {
  buildingCategory,
  projectCategory,
  toolCategory,
} from "@/dummy-data/dummy-data";
import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";

export default function Page() {
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const descriptionInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  async function submitFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    router.push("/home");
  }

  return (
    <div>
      <p>投稿</p>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="title">タイトル</label>
          <input type="text" id="title" ref={titleInputRef} />
        </div>
        <ul>
          {projectCategory.map((category) => {
            return (
              <li key={category.id[0]}>
                <label htmlFor="title" >
                  <input type="checkbox" id={category.id[0]} value={category.id[0]}/>
                  {category.title}
                </label>
              </li>
            );
          })}
        </ul>
        <ul>
          {buildingCategory.map((category) => {
            return (
              <li key={category.id[0]}>
                <label htmlFor="title">
                  <input type="checkbox" id={category.id[0]} value={category.id[0]}/>
                  {category.title}
                </label>
              </li>
            );
          })}
        </ul>
        <ul>
          {toolCategory.map((category) => {
            return (
              <li key={category.id[0]}>
                <label htmlFor="title">
                  <input type="checkbox" id={category.id[0]} value={category.id[0]}/>
                  {category.title}
                </label>
              </li>
            );
          })}
        </ul>
        <div>
          <label htmlFor="image">写真</label>
          <input type="file" id="image" />
        </div>
        <div>
          <label htmlFor="description">内容</label>
          <input type="text" id="description" ref={descriptionInputRef} />
        </div>
        <button>投稿する</button>
      </form>
    </div>
  );
}
