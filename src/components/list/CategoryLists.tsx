"use client";

import CategoryList from "@/models/categoryList";
import styled from "styled-components";

type Props = {
  category: CategoryList[];
};

export const CategoryLists = ({ category }: Props) => {
  return (
    <List>
      {category.map((category) => {
        return (
          <CategoryItem key={category.id[0]}>
            <label>
              <Input
                type="checkbox"
                id={category.id[0]}
                name={category.id[0]}
                value={category.id[0]}
              />
              {category.title}
            </label>
          </CategoryItem>
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

const CategoryItem = styled.li`
  margin-top: 10px;
`;

const Input = styled.input`
  --border-color: #9fa0a0;
  --background-color: #434141;

  cursor: pointer;
  padding-left: 30px;
  vertical-align: middle;
  position: relative;

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
  }

  &::before {
    border-color: var(--border-color);
    background-color: var(--background-color);
    border: 3px solid #666464;
    width: 20px;
    height: 20px;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 50%;
  }

  &::after {
    opacity: 0;
    width: 10px;
    height: 10px;
    background-color: var(--border-color);
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 50%;
  }

  &:checked::after {
    opacity: 1;
  }
`;
