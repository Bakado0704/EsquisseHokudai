"use client";

import styled from "styled-components";

type Props = {
  index: number;
};

export const EsquisseIndex = ({ index }: Props) => {
  return (
    <Container>
      <LeftLine />
      <EsquisseText>エスキス{index}回目</EsquisseText>
      <RightLine />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  margin-bottom: 16px;
`;

const LeftLine = styled.div`
  width: calc((100% - 160px) / 2);
  height: 3px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EsquisseText = styled.p`
  width: 160px;
  text-align: center;
  font-size: 24px;
  white-space: nowrap;
  margin-right: 16px;
  margin-left: 16px;
`;

const RightLine = styled.div`
  width: calc((100% - 160px) / 2);
  height: 3px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
