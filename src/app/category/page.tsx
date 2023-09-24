"use client";

import { CategoryLinkList } from "@/components/list/CategoryLinkList";
import { NavFooter } from "@/components/nav/NavFooter/NavFooter";
import { NavHeader } from "@/components/nav/NavHeader/NavHeader";
import styled from "styled-components";

export default function Page() {
  return (
    <>
      <NavHeader />
      <Wrapper>
        <WrapperInner>
          <Title>カテゴリ</Title>
          <CategoryLinkList/>
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

const Title = styled.p`
  font-size: 24px;
  text-decoration: underline;
  text-align: center;
`;
