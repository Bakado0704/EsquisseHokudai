"use client";

import { changeEsquisse } from "@/helpers/api-change";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Uploading } from "../bg/Uploading";
import { ChangeEsquisseForm } from "../form/changeform/ChangeEsquisseForm";
import { CloseButton } from "../button/CloseButton";
import { Bg } from "../bg/Background";
import { FormButton } from "../button/FormButton";

type Props = {
  id: string;
  modalClose: () => void;
};

export const ChangeEsquisseModal = (props: Props) => {
  const router = useRouter();
  const postedKey = props.id;
  const esquisses = useSelector((state: RootState) => state.post.esquisses);
  const selectedEsquisse = esquisses.find((esquisse) => esquisse.key === postedKey);
  const selectedPostId = selectedEsquisse!.id;
  const index = esquisses.indexOf(selectedEsquisse!);
  const [description, setDescription] = useState(selectedEsquisse!.description);
  const [uploading, setUploading] = useState(false);

  async function submitFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUploading(true);

    await changeEsquisse(
      selectedPostId!,
      postedKey,
      index,
      description
    ).then(() => {
      router.push(`/esquisse/${selectedPostId}`);
      props.modalClose();
      setUploading(false);
    });
  }

  const descriptionHandler = () => {
    const enteredDescription = (document.getElementById("description") as HTMLInputElement).value;
    setDescription(enteredDescription);
  };

  return (
    <Wrapper>
      <Bg modalClose={props.modalClose} />
      {uploading && <Uploading text="アップロード中..." />}
      <WrapperInner>
        <Content>
          <CloseButton modalClose={props.modalClose} />
          <Title>エスキス修正</Title>
          <form onSubmit={submitFormHandler}>
            <ChangeEsquisseForm
              description={description}
              descriptionHandler={descriptionHandler}
            />
            <FormButton>投稿を変更する</FormButton>
          </form>
        </Content>
      </WrapperInner>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  --text-color: #3e3a39;

  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: hidden;
  position: absolute;
  color: var(--text-color);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const WrapperInner = styled.div`
  --background-color: #efefef;

  width: 100%;
  max-width: 1200px;
  background-color: var(--background-color);
  border-radius: 20px;
  position: relative;
  padding: 40px;
`;

const Content = styled.div`
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.p`
  margin-top: 10px;
  font-size: 16px;
  margin-top: 0;
  font-size: 32px;
  text-decoration: underline;
  text-align: center;
`;
