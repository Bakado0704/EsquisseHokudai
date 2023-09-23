"use client";

import { buildingCategory } from "@/categoryData/categoryData";
import { NavFooter } from "@/components/nav/NavFooter/NavFooter";
import { NavHeader } from "@/components/nav/NavHeader/NavHeader";
import Image from "next/image";
import Link from "next/link";
import styled, { css } from "styled-components";

export default function Page() {
  return (
    <>
      <NavHeader />
      <Wrapper>
        <WrapperInner>
          <P>カテゴリ</P>
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
                    <P $title={true}>{category.title}</P>
                  </Link>
                </Li>
              );
            })}
          </Ul>
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
  padding-top: 40px;

  padding-right: 40px;
  padding-left: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WrapperInner = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 80px;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const P = styled.p<{ $title?: boolean }>`
  --color-text: #434141;

  font-size: 24px;
  text-decoration: underline;
  text-align: center;

  ${(props) =>
    props.$title &&
    css`
      width: 100%;
      position: absolute;
      padding-top: 8px;
      padding-bottom: 8px;
      padding-left: 10px;
      top: 300px;
      font-size: 16px;
      text-decoration: none;
      text-align: left;
      background-color: var(--color-text);
    `}
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
