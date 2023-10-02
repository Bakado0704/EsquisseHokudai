"use client";

import styled from "styled-components";
import { CloseButton } from "../button/CloseButton";
import { Bg } from "../bg/Background";
import { DeleteOkButton } from "../button/DeleteOkButton";

type Props = {
  onDelete: () => Promise<void>;
  modalClose: () => void;
};

export const DeleteModal = ({ onDelete, modalClose }: Props) => {
  return (
    <Wrapper>
      <Bg modalClose={modalClose} />
      <WrapperInner>
        <Content>
          <CloseButton modalClose={modalClose} />
          <Title>本当に消去しますか？</Title>
          <DeleteOkButton modalClose={modalClose} onDelete={onDelete}/>
        </Content>
      </WrapperInner>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  --text-color: #3e3a39;

  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: hidden;
  position: absolute;
  color: var(--text-color);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const WrapperInner = styled.div`
  --background-color: #efefef;

  width: 100%;
  max-width: 600px;
  background-color: var(--background-color);
  border-radius: 20px;
  position: relative;
  padding: 40px;
`;

const Content = styled.div`
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  position: relative;
`;

const Title = styled.p`
  margin-top: 0;
  font-size: 24px;
  text-align: center;
`;