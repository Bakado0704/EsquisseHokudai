"use client";

import { LegacyRef } from "react";
import styled from "styled-components";

type Props = {
  title: string;
  type: string;
  ref: LegacyRef<HTMLInputElement> | undefined;
  placeholder: string;
};

export const InputFrom = ({ type, ref, placeholder, title }: Props) => {
  return (
    <Container>
      <Label htmlFor={`${type}`}>{title}</Label>
      <Input
        type={`${type}`}
        id={`${type}`}
        placeholder={`${placeholder}`}
        ref={ref}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 16px;
  display: block;
`;

const Label = styled.label`
  align: top;
`;

const Input = styled.input`
  --border-color: #c9caca;
  --text-color: #323131;

  display: block;
  width: 100%;
  padding: 6px;
  font-size: 12px;
  margin-top: 2px;
  background-color: white;
  color: var(--text-color);
  border: solid 2px var(--border-color);
  border-radius: 4px;
`;
