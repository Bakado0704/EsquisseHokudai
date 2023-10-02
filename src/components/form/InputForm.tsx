"use client";

import { SetStateAction } from "react";
import styled from "styled-components";

type Props = {
  title: string;
  type: string;
  placeholder: string;
  onChange: (e: { target: { value: SetStateAction<string | undefined>; }; }) => void;
  value: string | undefined;
};

export const InputForm = ({ type, onChange, placeholder, title, value }: Props) => {
  return (
    <Container>
      <Label htmlFor={`${type}`}>{title}</Label>
      <Input
        type={`${type}`}
        id={`${type}`}
        placeholder={`${placeholder}`}
        onChange={onChange}
        value={value}
        required
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
