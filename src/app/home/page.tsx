"use client";

import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import styled, { css } from "styled-components";
import { BuildingType, ProjectType, ToolType } from "@/types/category";
import { useEffect } from "react";
import { IndicatePost } from "@/store/post";
import { RootState } from "@/store/store";
import { getAllPosts, getUser } from "@/helpers/api-util";
import NavHeader from "@/components/nav/NavHeader/NavHeader";
import NavFooter from "@/components/nav/NavFooter/NavFooter";
import tagImg from "@/assets/icon/tag.svg";
import { useRouter } from "next/navigation";

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const posts = useSelector((state: RootState) => state.post.posts);

  useEffect(() => {
    getAllPosts().then(function (result) {
      dispatch(IndicatePost(result));
    });
  }, [dispatch]);

  if (!posts) {
    <p>Loading...</p>;
  }

  function postHandler() {
    router.push("/post");
  }

  getUser();

  return (
    <>
      <NavHeader />
      <Wrapper>
        <WrapperInner>
          <P $home={true}>ホーム</P>
          <Div $wrapper={true}>
            {posts && (
              <Ul>
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
                    <Li $article={true} key={post.id}>
                      <Link href={`/esquisse/${post.id}`}>
                        <Div $item={true}>
                          {post.image && (
                            <Image
                              src={post.imageSource}
                              alt={`${post.image}`}
                              width={300}
                              height={200}
                            />
                          )}
                          <Div $text={true}>
                            <Div $list={true}>
                              <Ul $article={true}>
                                {tags &&
                                  tags.map((data) => {
                                    if (data) {
                                      return (
                                        <Li $tag={true} key={data[0]}>
                                          <Image
                                            src={tagImg}
                                            alt="tag"
                                            width={17}
                                            height={20}
                                          />
                                          <P $tag={true}>{data[1]}</P>
                                        </Li>
                                      );
                                    }
                                  })}
                              </Ul>
                              <P $title={true}>{post.title}</P>
                              <P>{post.user.displayName}</P>
                              <P>{post.createdAt}</P>
                            </Div>
                          </Div>
                        </Div>
                      </Link>
                    </Li>
                  );
                })}
              </Ul>
            )}
          </Div>
          <Div $submit={true}>
            <Button onClick={postHandler}>投稿する</Button>
          </Div>
        </WrapperInner>
      </Wrapper>
      <NavFooter />
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

const Ul = styled.ul<{ $article?: boolean }>`
  ${(props) =>
    props.$article &&
    css`
      display: flex;
      align-items: center;
    `}
`;

const Li = styled.li<{ $tag?: boolean; $article?: boolean }>`
  display: flex;

  ${(props) =>
    props.$article &&
    css`
      width: 100%;
      padding-top: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid white;
    `}

  ${(props) =>
    props.$tag &&
    css`
      margin-right: 10px;
    `}
`;

const Div = styled.div<{
  $list?: boolean;
  $text?: boolean;
  $item?: boolean;
  $submit?: boolean;
  $wrapper?: boolean;
}>`
  ${(props) =>
    props.$item &&
    css`
      display: flex;
    `}

  ${(props) =>
    props.$text &&
    css`
      margin-left: 16px;
      display: flex;
      align-items: center;
      justifu-content: center;
    `}

    ${(props) =>
    props.$submit &&
    css`
      display: flex;
      justify-content: center;
      padding-bottom: 32px;
    `}

    ${(props) =>
    props.$wrapper &&
    css`
      height: calc(100% - 171px);
      overflow-y: scroll;
      border-bottom: 1px solid white;

      &::-webkit-scrollbar{
        display: none;
      }
    `}
`;

const P = styled.p<{
  $title?: boolean;
  $tag?: boolean;
  $home: boolean;
}>`
  margin-top: 10px;
  font-size: 16px;

  ${(props) =>
    props.$home &&
    css`
      margin-top: 0;
      font-size: 32px;
      padding-top: 32px;
      text-decoration: underline;
      text-align: center;
    `}

  ${(props) =>
    props.$tag &&
    css`
      margin-right: 10px;
      margin-left: 5px;
      margin-top: 0;
    `}

    ${(props) =>
    props.$title &&
    css`
      font-size: 24px;
      text-decoration: underline;
      text-align: left;
    `}
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
`;
