"use client";

import styled from "styled-components";
import { CategoryLists } from "../../list/CategoryLists";
import CategoryList from "@/models/categoryList";

type Props = {
  projectCategory: CategoryList[];
  buildingCategory: CategoryList[];
  toolCategory: CategoryList[];
};

export const PostCategoryForm = ({
  projectCategory,
  buildingCategory,
  toolCategory,
}: Props) => {
  return (
    <Container>
      <LeftText>カテゴリ</LeftText>
      <RightContainer>
        <CategoryLists category={projectCategory} />
        <CategoryLists category={buildingCategory} />
        <CategoryLists category={toolCategory} />
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
