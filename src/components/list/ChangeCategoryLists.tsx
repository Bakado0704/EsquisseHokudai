"use client";

import CategoryList from "@/models/categoryList";
import styled from "styled-components";
import { CategoryItem } from "../item/CategoryItem";

type Props = {
  category: CategoryList[];
};

export const ChangeCategoryLists = ({ category }: Props) => {
  return (
    <List>
      {category && category.map((category) => {
        return (
          <CategoryItem category={category} key={category.id[0]} />
        );
      })}
    </List>
  );
};

const List = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  &:first-child {
    margin-top: 0;
  }
`;