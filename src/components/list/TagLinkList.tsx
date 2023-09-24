"use client";

import Image from "next/image";
import styled from "styled-components";
import { BuildingType, ProjectType, ToolType } from "@/types/category";
import tagImg from "@/assets/icon/tag.svg";
import Link from "next/link";

type Props = {
  tags: (ProjectType | BuildingType | ToolType)[];
};

export const TagLInkList = ({ tags }: Props) => {
  return (
    <List>
      {tags &&
        tags.map((data) => {
          if (data) {
            return (
              <TagItem key={data[0]}>
                <Link href={`/category/${data[0]}`}>
                  <LinkContainer>
                    <Image src={tagImg} alt="tag" width={17} height={20} />
                    <PostTag>{data[1]}</PostTag>
                  </LinkContainer>
                </Link>
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
  margin-right: 10px;
`;

const LinkContainer = styled.div`
  display: flex;
`;

const PostTag = styled.p`
  font-size: 16px;
  margin-right: 10px;
  margin-left: 5px;
  margin-top: 0;
`;
