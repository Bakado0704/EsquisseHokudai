"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { BuildingType, ProjectType, ToolType } from "@/types/category";
import Post from "@/models/post";
import { TagList } from "../list/TagList";

type Props = {
  post: Post;
  tags: (ProjectType | BuildingType | ToolType)[];
};

export const PostItem = ({ post, tags }: Props) => {
  console.log(tags);
  return (
    <Items key={post.id}>
      <Link href={`/esquisse/${post.id}`}>
        <PostWrap>
          <Image
            src={post.imageSource}
            alt={`${post.image}`}
            width={300}
            height={200}
          />
          <PostTextWrap>
            <PostTextWrapInner>
              <TagList tags={tags} />
              <PostTitle>{post.title}</PostTitle>
              <PostText>{post.user.displayName}</PostText>
              <PostText>{post.createdAt}</PostText>
            </PostTextWrapInner>
          </PostTextWrap>
        </PostWrap>
      </Link>
    </Items>
  );
};

const Items = styled.li`
  display: flex;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid white;
`;

const PostWrap = styled.div`
  display: flex;
`;

const PostTextWrap = styled.div`
  margin-left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PostTextWrapInner = styled.div``;

const PostTitle = styled.p`
  margin-top: 10px;
  font-size: 24px;
  text-decoration: underline;
  text-align: left;
`;

const PostText = styled.p`
  margin-top: 10px;
  font-size: 16px;
`;
