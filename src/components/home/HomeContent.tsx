"use client";

import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "@/store/store";
import { getUser } from "@/helpers/api-util";
import { useRouter } from "next/navigation";
import { PostList } from "@/components/list/PostList";

export const HomeContent = () => {
  const router = useRouter();
  const posts = useSelector((state: RootState) => state.post.posts);
  const activeUser = getUser();

  if (!posts) {
    <p>Loading...</p>;
  }

  const postHandler = () => {
    if (activeUser) {
      router.push("/post");
    } else {
      router.push("/login");
    }
  };

  return (
    <>
      <Wrapper>
        <WrapperInner>
          <HomeTitle>ホーム</HomeTitle>
          <Content>
            <PostList />
          </Content>
          <ButtonWrap>
            <Button onClick={postHandler}>投稿する</Button>
          </ButtonWrap>
        </WrapperInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 90%;
  max-width: 1440px;
  margin: 0 auto;
  padding-right: 40px;
  padding-left: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: hidden;
`;

const WrapperInner = styled.div`
  width: 100%;
  height: 100%;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 32px;
`;

const Content = styled.div`
  height: calc(100% - 171px);
  overflow-y: scroll;
  border-bottom: 1px solid white;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const HomeTitle = styled.p`
  margin-top: 0;
  font-size: 32px;
  padding-top: 32px;
  text-decoration: underline;
  text-align: center;
`;

const Button = styled.button`
  --border-color: #c9caca;
  --text-color: #323131;

  display: block;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 32px;
  padding-left: 32px;
  background-color: white;
  color: var(--text-color);
  border: solid 2px var(--border-color);
  border-radius: 10px;
  margin-top: 32px;

  &:hover {
    filter: brightness(0.85);
  }
`;
