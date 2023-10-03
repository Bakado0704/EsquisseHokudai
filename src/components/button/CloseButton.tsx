"use client";

import styled from "styled-components";

type Props = {
  modalClose: () => void;
};

export const CloseButton = ({ modalClose }: Props) => {
  return (
    <Button onClick={modalClose}>
      <Span />
      <Span />
    </Button>
  );
};

const Button = styled.button`
  --border-color: #c9caca;
  --text-color: #323131;

  display: block;
  position: absolute;
  width: 30px;
  height: 30px;
  top: 5px;
  right: 5px;
`;

const Span = styled.span`
  background-color: black;
  position: absolute;
  width: 24px;
  height: 2px;
  top: 50%;
  left: 50%;

  &:nth-child(1) {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:nth-child(2) {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;
