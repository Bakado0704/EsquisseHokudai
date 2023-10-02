"use client";

import styled from "styled-components";

type Props = {
  text: string;
};

export const Uploading = ({ text }: Props) => {
  return (
    <>
      <Upload />
      <Container>
        <Text>{text}</Text>
        <Description>しばらくお待ちください</Description>
      </Container>
    </>
  );
};

const Upload = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: black;
  opacity: 60%;
  top: 0;
  left: 0;
  z-index: 10000;
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 15000;
  color: white;
`;

const Text = styled.p`
  font-size: 32px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 16px;
  text-align: center;
  margin-top: 8px;
`;
