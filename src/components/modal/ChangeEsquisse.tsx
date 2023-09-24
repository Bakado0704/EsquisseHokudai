"use client";

import { changeEsquisse } from "@/helpers/api-change";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Uploading } from "../bg/Uploading";
import { SubmitButton } from "../button/SubmitButton";
import { ChangeEsquisseDescription } from "./ChangeEsquisseDescription";
import { CloseButton } from "../button/CloseButton";
import { Bg } from "../bg/Background";

type Props = {
  id: string;
  modalClose: () => void;
};

export default function ChangeEsquisse(props: Props) {
  const router = useRouter();
  const postedKey = props.id;
  const esquisses = useSelector((state: RootState) => state.post.esquisses);
  const selectedEsquisse = esquisses.find((esquisse) => esquisse.key === postedKey);
  const selectedPostId = selectedEsquisse?.id;
  //@ts-ignore
  const index = esquisses.indexOf(selectedEsquisse);
  const [description, setDescription] = useState(selectedEsquisse?.description);
  const [uploading, setUploading] = useState(false);

  async function submitFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUploading(true);

    await changeEsquisse(
      //@ts-ignore
      selectedPostId,
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
    //@ts-ignore
    const enteredDescription = document.getElementById("description").value;
    setDescription(enteredDescription);
  };

  return (
    <Wrapper>
      <Bg modalClose={props.modalClose} />
      {uploading && <Uploading />}
      <WrapperInner>
        <Content>
          <CloseButton modalClose={props.modalClose} />
          <Title>エスキス修正</Title>
          <form onSubmit={submitFormHandler}>
            <ChangeEsquisseDescription
              description={description}
              descriptionHandler={descriptionHandler}
            />
            <SubmitButton>投稿を変更する</SubmitButton>
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
