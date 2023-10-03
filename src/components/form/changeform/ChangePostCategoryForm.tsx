"use client";

import styled from "styled-components";
import { ChangeCategoryLists } from "@/components/list/ChangeCategoryLists";
import CategoryList from "@/models/categoryList";
import Post from "@/models/post";

type Props = {
  projectCategory: CategoryList[];
  buildingCategory: CategoryList[];
  toolCategory: CategoryList[];
  selectedPost: Post;
};

export const ChangePostCategoryForm = ({
  projectCategory,
  buildingCategory,
  toolCategory,
  selectedPost,
}: Props) => {
  let tags: string[] = [];

  if (selectedPost.category) {
    selectedPost.category.projectType?.map((data) => {
      tags.push(data[0]);
    });
    selectedPost.category.buildingType?.map((data) => {
      tags.push(data[0]);
    });
    selectedPost.category.toolType?.map((data) => {
      tags.push(data[0]);
    });
  }

  return (
    <Container>
      <LeftText>カテゴリ</LeftText>
      <RightContainer>
        <ChangeCategoryLists category={projectCategory} tags={tags} />
        <ChangeCategoryLists category={buildingCategory} tags={tags} />
        <ChangeCategoryLists category={toolCategory} tags={tags} />
      </RightContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid white;
`;

const LeftText = styled.p`
  width: 10%;
  text-align: center;
`;

const RightContainer = styled.div`
  width: 90%;
`;
