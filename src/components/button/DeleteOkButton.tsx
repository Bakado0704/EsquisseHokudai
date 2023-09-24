"use client";

import styled from "styled-components";

type Props = {
  onDelete: () => Promise<void>;
  modalClose: () => void;
};

export const DeleteOkButton = ({ onDelete, modalClose }: Props) => {
  return (
    <ButtonContainer>
      <CancelButton onClick={modalClose}>キャンセル</CancelButton>
      <OkButton onClick={onDelete}>OK</OkButton>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 48px;
`;

const CancelButton = styled.button`
  --border-color: #c9caca;
  --text-color: #323131;

  display: block;
  padding: 8px 32px;
  width: 30%;
  background-color: white;
  color: var(--text-color);
  border: solid 2px var(--border-color);
  border-radius: 10px;
  margin: 32px auto 0;
  text-align: center;
`;

const OkButton = styled.button`
  --text-color: #c9caca;
  --border-color: #323131;

  width: 30%;
  display: block;
  padding: 8px 32px;
  background-color: var(--border-color);
  color: var(--text-color);
  border: solid 2px var(--border-color);
  border-radius: 10px;
  margin: 32px auto 0;
  text-align: center;
`;
