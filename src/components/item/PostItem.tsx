"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { BuildingType, ProjectType, ToolType } from "@/types/category";
import tagImg from "@/assets/icon/tag.svg";
import Post from "@/models/post";

export const PostItem = (post: Post, tags:[]) => {
//   let tag = JSON.stringify(tags);

  return (
    <PostItems key={post.id}>
      <Link href={`/esquisse/${post.id}`}>
        <PostWrap>
          {post.image && (
            <Image
              src={post.imageSource}
              alt={`${post.image}`}
              width={300}
              height={200}
            />
          )}
          <PostTextWrap>
            <PostTextWrapInner>
              <TagList>
                {tags &&
                  tags.map((data) => {
                    if (data) {
                      return (
                        <TagItem key={data[0]}>
                          <Image
                            src={tagImg}
                            alt="tag"
                            width={17}
                            height={20}
                          />
                          <PostTag>{data[1]}</PostTag>
                        </TagItem>
                      );
                    }
                  })}
              </TagList>
              <PostTitle>{post.title}</PostTitle>
              <PostText>{post.user.displayName}</PostText>
              <PostText>{post.createdAt}</PostText>
            </PostTextWrapInner>
          </PostTextWrap>
        </PostWrap>
      </Link>
    </PostItems>
  );
}

const TagList = styled.ul`
  display: flex;
  align-items: center;
`;

const TagItem = styled.li`
  display: flex;
  margin-right: 10px;
`;

const PostItems = styled.li`
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

const PostTag = styled.p`
  font-size: 16px;
  margin-right: 10px;
  margin-left: 5px;
  margin-top: 0;
`;

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
