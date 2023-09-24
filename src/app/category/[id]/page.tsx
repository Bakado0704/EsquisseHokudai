"use client";

import {
  buildingCategory,
  projectCategory,
  toolCategory,
} from "@/categoryData/categoryData";
import { NavFooter } from "@/components/nav/NavFooter/NavFooter";
import { NavHeader } from "@/components/nav/NavHeader/NavHeader";
import { getAllPosts } from "@/helpers/api-util";
import CategoryList from "@/models/categoryList";
import { IndicatePost } from "@/store/post";
import { RootState } from "@/store/store";
import { BuildingType, ProjectType, ToolType } from "@/types/category";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import tagImg from "@/assets/icon/tag.svg";

type Props = {
  params: Params;
};

export default function Page(props: Props) {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.post.posts);

  useEffect(() => {
    getAllPosts().then(function (result) {
      dispatch(IndicatePost(result));
    });
  }, [dispatch]);

  const postedId = props.params.id;

  let tags: CategoryList[] = [];
  //集合配列tagについて
  buildingCategory?.map((data) => {
    tags.push(data);
  });
  projectCategory?.map((data) => {
    tags.push(data);
  });
  toolCategory?.map((data) => {
    tags.push(data);
  });

  const categoryTitle = tags.find(
    (category) => category.id[0] === postedId
  )?.title;

  return (
    <>
      <NavHeader />
      <Wrapper>
        <WrapperInner>
          <CategoryTitle>{categoryTitle}</CategoryTitle>
          <Content>
            <Ul>
              {posts.map((post) => {
                let tags: (ProjectType | BuildingType | ToolType)[] = [];
                let selectedtags: string[] = [];

                //集合配列tagについて
                post.category.projectType?.map((data) => {
                  tags.push(data);
                  selectedtags.push(data[0]);
                });
                post.category.buildingType?.map((data) => {
                  tags.push(data);
                  selectedtags.push(data[0]);
                });
                post.category.toolType?.map((data) => {
                  tags.push(data);
                  selectedtags.push(data[0]);
                });

                if (selectedtags.includes(postedId)) {
                  return (
                    <Li $article={true} key={post.id}>
                      <Link href={`/esquisse/${post.id}`}>
                        <Div $item={true}>
                          <Image
                            src={post.imageSource}
                            alt=""
                            width={300}
                            height={200}
                          />
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
                }
              })}
            </Ul>
          </Content>
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

const CategoryTitle = styled.p`
  margin-top: 0;
  font-size: 32px;
  padding-top: 32px;
  text-decoration: underline;
  text-align: center;
`;

const Content = styled.div`
  height: calc(100% - 171px);
  overflow-y: scroll;
  border-bottom: 1px solid white;

  &::-webkit-scrollbar {
    display: none;
  }
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
      height: calc(100% - 100px);
      overflow-y: scroll;

      &::-webkit-scrollbar {
        display: none;
      }
    `}
`;

const P = styled.p<{
  $title?: boolean;
  $tag?: boolean;
  $home?: boolean;
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
