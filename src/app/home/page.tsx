"use client";

import Link from "next/link";
import { dummyData } from "@/dummy-data/dummy-data";
import Image from "next/image";
import styled, { css } from "styled-components";
import { BuildingType, ProjectType, ToolType } from "@/types/category";

export default function Page() {
  return (
    <div>
      <h1>ホーム</h1>
      <ul>
        {dummyData.map((dummyData) => {
          let tags: string[] = [];

          //集合配列tagについて
          dummyData.category.projectType?.map((data) => {
            tags.push(data[1]);
          });

          dummyData.category.buildingType?.map((data) => {
            tags.push(data[1]);
          });

          dummyData.category.toolType?.map((data) => {
            tags.push(data[1]);
          });

          console.log(tags);

          return (
            <li key={dummyData.id}>
              <Link href={`/esquisse/${dummyData.id}`}>
                <Image src={dummyData.image} alt="" width={300} height={200} />
                <ul>
                  {dummyData.category.projectType &&
                    dummyData.category.projectType.map((data: ProjectType) => {
                      if (data) {
                        return (
                          <li key={data[0]}>
                            <p>{data[1]}</p>
                          </li>
                        );
                      }
                    })}
                  {dummyData.category.buildingType &&
                    dummyData.category.buildingType.map(
                      (data: BuildingType) => {
                        if (data) {
                          return (
                            <li key={data[0]}>
                              <p>{data[1]}</p>
                            </li>
                          );
                        }
                      }
                    )}
                  {dummyData.category.toolType &&
                    dummyData.category.toolType.map((data: ToolType) => {
                      if (data) {
                        return (
                          <li key={data[0]}>
                            <p>{data[1]}</p>
                          </li>
                        );
                      }
                    })}
                </ul>
                <p>{dummyData.title}</p>
                <p>{dummyData.user.username}</p>
                <p>{dummyData.createdAt}</p>
              </Link>
            </li>
          );
        })}
      </ul>
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
