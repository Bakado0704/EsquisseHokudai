"use client";
import { SetStateAction } from "react";
import styled from "styled-components";

type Props = {
  comment: string;
  setComment: (value: SetStateAction<string>) => void;
};

export const EsquisseForm = ({ comment, setComment }: Props) => {
  return (
    <FormContainer>
      <Label htmlFor="text">コメントを追加する。</Label>
      <Textarea
        id="text"
        value={comment}
        rows={5}
        onChange={(e: { target: { value: SetStateAction<string>; }; }) => setComment(e.target.value)}
      />
    </FormContainer>
  );
};

const FormContainer = styled.div`
  margin-top: 24px;
`;

const Label = styled.label`
  align: top;
`;

const Textarea = styled.textarea`
  --border-color: #9fa0a0;
  --background-color: #434141;

  display: block;
  width: 100%;
  padding: 6px;
  font-size: 14px;
  margin-top: 8px;
  background-color: var(--background-color);
  border: solid 3px var(--border-color);
  border-radius: 8px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;
