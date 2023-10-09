"use client";

import { esquisseSubmit, getAllEsquisses, getUser } from "@/helpers/api-util";
import { IndicateEsquisse } from "@/store/post";
import backImg from "@/assets/icon/back-button.png";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { EsquisseForm } from "../form/EsquisseForm";
import { FormButton } from "../button/FormButton";
import Image from "next/image";

type Props = {
  index: number;
  side: boolean;
  id: string;
  sideDelete: () => void;
  comment: string;
  setComment: (comment: string) => void;
};

export const SideCommentPost = ({
  index,
  side,
  id,
  comment,
  setComment,
  sideDelete,
}: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  let scroll;

  if (side) {
    scroll = "440px";
  } else {
    scroll = "100vw";
  }

  const submitFormHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await esquisseSubmit(id, comment).then(async () => {
      await getAllEsquisses().then((result) => {
        dispatch(IndicateEsquisse(result));
        setComment("");
        sideDelete();
      });
    });
  };

  return (
    <Side style={{ transform: `translate(${scroll})` }}>
      <DummyHeader />
      <Content>
        <Button onClick={sideDelete}>
          <Image src={backImg} alt="tag" width={40} height={40} />
        </Button>
        <Form onSubmit={submitFormHandler}>
          <EsquisseForm
            index={index}
            comment={comment}
            setComment={setComment}
          />
          <FormButton>メッセージを投稿する</FormButton>
        </Form>
      </Content>
    </Side>
  );
};

const Side = styled.div`
  --background-color: #595757;

  background-color: var(--background-color);
  width: calc(50% - 440px);
  height: 100%;
  left: 50%;
  top: 0;
  overflow-y: scroll;
  position: fixed;
  transition: all 0.16s ease-in-out;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const DummyHeader = styled.div`
  width: 100%;
  height: 80px;
`;

const Content = styled.div`
  padding: 40px;
`;

const Button = styled.button`
  &:hover {
    filter: brightness(0.85);
  }
`;

const Form = styled.form`
  margin-top: 24px;
`;
