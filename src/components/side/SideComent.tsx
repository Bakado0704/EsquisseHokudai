"use client";

import styled from "styled-components";

type Props = {
  side: boolean;
  sideDelete: () => void;
};

export const SideComment = ({ side, sideDelete }: Props) => {
  let scroll;

  if (side) {
    scroll = "440px";
  } else {
    scroll = "100vw";
  }

  return (
    <Side style={{ transform: `translate(${scroll})` }}>
      <DummyHeader />
      <Content >
        <Button onClick={sideDelete}>消去</Button>
      </Content>
    </Side>
  );
};

const Side = styled.div`
  --background-color: #595757;

  background-color: var(--background-color);
  width: calc(50% - 440px);
  height: 100%;
  left: 50%;
  top: 0;
  overflow-y: scroll;
  position: fixed;
  transition: all 0.16s ease-in-out;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const DummyHeader = styled.div`
  width: 100%;
  height: 80px;
`;

const Content = styled.div`
  padding-top: 40px;
  padding-bottom: 40px;
`;

const Button = styled.button``;
