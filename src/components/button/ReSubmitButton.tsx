"use client";

import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  onClick?: () => {};
};

export const ReSubmitButton = ({ children, onClick }: Props) => {
  return <Button onClick={onClick}>{children}</Button>;
};

const Button = styled.button`
  --border-color: #c9caca;
  --text-color: #323131;

  display: block;
  padding: 8px 32px;
  background-color: white;
  color: var(--text-color);
  border: solid 2px var(--border-color);
  border-radius: 10px;
  margin: 32px auto 0;
`;
