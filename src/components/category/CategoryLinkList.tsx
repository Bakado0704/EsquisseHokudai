"use client";

import { buildingCategory } from "@/categoryData/categoryData";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export const CategoryLinkList = () => {
  return (
    <Ul>
      {buildingCategory.map((category) => {
        return (
          <Li key={category.id[0]}>
            <Link
              style={{ width: "100%" }}
              href={`/category/${category.id[0]}`}
            >
              {category.image && (
                <Image
                  src={category.image}
                  alt=""
                  layout={"fill"}
                  objectFit={"cover"}
                />
              )}
              <Text>{category.title}</Text>
            </Link>
          </Li>
        );
      })}
    </Ul>
  );
}

const Text = styled.p`
  --color-text: #434141;

  width: 100%;
  position: absolute;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 10px;
  top: 300px;
  font-size: 16px;
  text-align: left;
  background-color: var(--color-text);
`;

const Title = styled.p`
  font-size: 24px;
  text-decoration: underline;
  text-align: center;
`;

const Ul = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 32px;
  gap: 64px 32px;
`;

const Li = styled.li`
  position: relative;
  display: flex;
  width: calc((100% - 64px) / 3);
  height: 300px;
`;
