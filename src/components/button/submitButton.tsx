"use client";

import styled from "styled-components";

export const SubmitButton = (children: React.ReactNode) => {
  return <Button>{children}</Button>;
};

const Button = styled.button`
  --text-color: #323131;

  display: block;
  padding-top: 8px 32px;
  background-color: white;
  color: var(--text-color);
  border: solid 2px var(--border-color);
  border-radius: 10px;
  margin: 32px auto 0;
`;
