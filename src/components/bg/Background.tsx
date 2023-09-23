"use client";

import styled from "styled-components";

type Props = {
  modalClose: () => void;
};

export const Bg = ({ modalClose }: Props) => {
  return <Background onClick={modalClose} />;
};

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: black;
  opacity: 60%;
  top: 0;
  left: 0;
`;
