"use client";

import Image from "next/image";
import styled from "styled-components";
import { BuildingType, ProjectType, ToolType } from "@/types/category";
import tagImg from "@/assets/icon/tag.svg";

type Props = {
  tags: (ProjectType | BuildingType | ToolType)[];
};

export const TagList = ({ tags }: Props) => {
  return (
    <List>
      {tags &&
        tags.map((data) => {
          if (data) {
            return (
              <TagItem key={data[0]}>
                <Image src={tagImg} alt="tag" width={17} height={20} />
                <PostTag>{data[1]}</PostTag>
              </TagItem>
            );
          }
        })}
    </List>
  );
};

const List = styled.ul`
  display: flex;
  align-items: center;
`;

const TagItem = styled.li`
  display: flex;
  margin-right: 10px;
`;

const PostTag = styled.p`
  font-size: 16px;
  margin-right: 10px;
  margin-left: 5px;
  margin-top: 0;
`;
