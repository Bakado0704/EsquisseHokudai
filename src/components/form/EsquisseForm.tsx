"use client";
import { SetStateAction } from "react";
import styled from "styled-components";

type Props = {
  index: number;
  comment: string;
  setComment: (comment: string) => void;
};

export const EsquisseForm = ({ index, comment, setComment }: Props) => {
  return (
    <FormContainer>
      <Label>コメント追加 ＞＞ エスキス{index}回目</Label>
      <Textarea
        id="text"
        value={comment}
        rows={5}
        onChange={(e) => setComment(e.target.value)}
        required
      />
    </FormContainer>
  );
};

const FormContainer = styled.div`
  margin-top: 24px;
`;

const Label = styled.label`
  align: top;
  font-size: 24px;
`;

const Textarea = styled.textarea`
  --border-color: #9FA0A0;
  --background-color: #727171;

  display: block;
  width: 100%;
  padding: 6px;
  font-size: 14px;
  margin-top: 16px;
  background-color: var(--background-color);
  border: solid 3px var(--border-color);
  border-radius: 8px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;
