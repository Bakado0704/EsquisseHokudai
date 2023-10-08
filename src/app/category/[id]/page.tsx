"use client";

import {
  buildingCategory,
  projectCategory,
  toolCategory,
} from "@/categoryData/categoryData";
import { NavFooter } from "@/components/nav/NavFooter/NavFooter";
import { NavHeader } from "@/components/nav/NavHeader/NavHeader";
import { getAllPosts } from "@/helpers/api-storage";
import CategoryList from "@/models/categoryList";
import { IndicatePost } from "@/store/post";
import { RootState } from "@/store/store";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { CategoryPostList } from "@/components/list/CategoryPostList";

type Props = {
  params: Params;
};

export default function Page(props: Props) {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.post.posts);

  useEffect(() => {
    getAllPosts().then((result) => {
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
            <CategoryPostList postedId={postedId} posts={posts} />
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
