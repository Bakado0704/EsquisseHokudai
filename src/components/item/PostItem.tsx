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
  return (
    <Items key={post.id}>
      <Link href={`/esquisse/${post.id}`} style={{width: "100%"}}>
        <PostWrap>
          <ImageWrap>
            <Image
              src={post.imageSource}
              alt={`${post.image}`}
              layout={"fill"}
              objectFit={"cover"}
            />
          </ImageWrap>
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
  width: 100%;
  display: flex;
`;

const ImageWrap = styled.div`
  position: relative;
  width: 25%;
  height: 200px;
`;

const PostTextWrap = styled.div`
  width: 75%;
  margin-left: 16px;
  display: flex;
  align-items: center;
  justify-content: left;
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
