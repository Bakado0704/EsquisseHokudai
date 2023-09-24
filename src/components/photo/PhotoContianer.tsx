"use client";

import Post from "@/models/post";
import Image from "next/image";
import styled from "styled-components";

type Props = {
    selectedPost: Post;
  };
  

export const PhotoContainer = ({selectedPost}: Props) => {
  return (
    <Photo>
      <PhotoInner>
        <Image
          src={selectedPost.imageSource}
          alt=""
          layout={"fill"}
          objectFit={"cover"}
        />
      </PhotoInner>
    </Photo>
  );
}

const Photo = styled.div`
  --color-background: #c9caca;

  width: 100%;
  height: 600px;
  padding-right: 80px;
  padding-left: 80px;
  margin-top: 8px;
  background-color: var(--color-background);
`;

const PhotoInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
