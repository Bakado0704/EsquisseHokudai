"use client";

import styled from "styled-components";

type Props = {
  description: string | undefined;
  setDescription: (description: string) => void;
};

export const ChangeEsquisseForm = ({ description, setDescription }: Props) => {
  return (
    <Container>
      <Label>内容</Label>
      <Textarea
        id="description"
        value={description}
        rows={5}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid white;
`;

const Label = styled.label`
  width: 10%;
  text-align: center;
`;

const Textarea = styled.textarea`
  --border-color: #9fa0a0;
  --background-color: #dcdddd;

  display: block;
  width: 90%;
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
