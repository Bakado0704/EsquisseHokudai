"use client";

import { changeEsquisse } from "@/helpers/api-change";

import { RootState } from "@/store/store";

import { useRouter } from "next/navigation";
import { FormEvent, useState, useRef } from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";

type Props = {
  id: string;
  modalClose: () => void;
};

export default function ChangeEsquisse(props: Props) {
  const descriptionInputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();
  const postedKey = props.id;
  const esquisses = useSelector((state: RootState) => state.post.esquisses);
  const selectedEsquisse = esquisses.find(
    (esquisse) => esquisse.key === postedKey
  );
  const selectedPostId = selectedEsquisse?.id;
  //@ts-ignore
  const index = esquisses.indexOf(selectedEsquisse);
  const [description, setDescription] = useState(selectedEsquisse?.description);
  async function submitFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const enteredDescription = descriptionInputRef.current?.value;

    await changeEsquisse(
      //@ts-ignore
      selectedPostId,
      postedKey,
      index,
      enteredDescription
    ).then(() => {
      router.push(`/esquisse/${selectedPostId}`);
    });
  }

  const descriptionHandler = () => {
    //@ts-ignore
    const enteredDescription = document.getElementById("description").value;
    setDescription(enteredDescription);
  };

  return (
    <Wrapper>
      <Div $bg={true} onClick={props.modalClose}></Div>
      <WrapperInner>
        <Div $container={true}>
          <Button $close={true} onClick={props.modalClose}>
            <Span />
            <Span />
          </Button>
          <P>エスキス修正</P>
          <form onSubmit={submitFormHandler}>
            <Div $wrapper={true}>
              <Label $left={true} htmlFor="description">
                内容
              </Label>
              <Textarea
                id="description"
                value={description}
                rows={5}
                onChange={descriptionHandler}
              />
            </Div>
            <Button $submit={true}>投稿を変更する</Button>
          </form>
        </Div>
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

const Div = styled.div<{
  $container?: boolean;
  $bg?: boolean;
  $wrapper?: boolean;
  $photo?: boolean;
  $photoinner?: boolean;
  $right?: boolean;
}>`
  --color-background: #dcdddd;

  ${(props) => props.$container && css``}

  ${(props) =>
    props.$bg &&
    css`
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: black;
      opacity: 60%;
      top: 0;
      left: 0;
    `}
  
      
    ${(props) =>
    props.$wrapper &&
    css`
      width: 100%;
      display: flex;
      align-items: center;
      padding-top: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid white;
    `}
  
      ${(props) =>
    props.$photo &&
    css`
      width: 100%;
      height: 400px;
      padding-right: 80px;
      padding-left: 80px;
      margin-top: 8px;
      background-color: var(--color-background);
    `}
    
      ${(props) =>
    props.$photoinner &&
    css`
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    `}
  
      ${(props) =>
    props.$right &&
    css`
      width: 90%;
    `}
`;

const Label = styled.label<{
  $left?: boolean;
}>`
  ${(props) =>
    props.$left &&
    css`
      width: 10%;
      text-align: center;
    `}
`;

const Button = styled.button<{ $close?: boolean; $submit?: boolean }>`
  --border-color: #c9caca;
  --text-color: #323131;

  ${(props) =>
    props.$close &&
    css`
      display: block;
      position: absolute;
      width: 30px;
      height: 30px;
      top: 5px;
      right: 5px;
    `}

  ${(props) =>
    props.$submit &&
    css`
      display: block;
      padding-top: 8px;
      padding-bottom: 8px;
      padding-right: 32px;
      padding-left: 32px;
      background-color: white;
      color: var(--text-color);
      border: solid 2px var(--border-color);
      border-radius: 10px;
      margin: 32px auto 0;
    `}
`;

const Span = styled.span`
  background-color: black;
  position: absolute;
  width: 24px;
  height: 2px;
  top: 50%;
  left: 50%;

  &:nth-child(1) {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:nth-child(2) {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
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

const P = styled.p`
  margin-top: 10px;
  font-size: 16px;
  margin-top: 0;
  font-size: 32px;
  text-decoration: underline;
  text-align: center;
`;
