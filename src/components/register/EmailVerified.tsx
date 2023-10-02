"use client";

import styled from "styled-components";
import { InputForm } from "@/components/form/InputForm";
import { FormButton } from "@/components/button/FormButton";
import { Uploading } from "@/components/bg/Uploading";
import { Dispatch, FormEvent, SetStateAction } from "react";

type Props = {
  uploading: boolean;
  submitFormHandler: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  name: string | undefined;
  setName: Dispatch<SetStateAction<string | undefined>>;
  passwordInput: string | undefined;
  setPasswordInput: Dispatch<SetStateAction<string | undefined>>;
  passwordConfirm: string | undefined;
  setPasswordConfirm: Dispatch<SetStateAction<string | undefined>>;
};

export const EmailVerified = ({
  uploading,
  submitFormHandler,
  name,
  setName,
  passwordInput,
  setPasswordInput,
  setPasswordConfirm,
  passwordConfirm,
}: Props) => {
  return (
    <>
      <Wrapper>
        {uploading && <Uploading text="アカウント作成中..." />}
        <WrapperInner>
          <Title>メールアドレスの受信が確認されました！</Title>
          <Form onSubmit={submitFormHandler}>
            <InputForm
              type="name"
              title="ニックネーム"
              placeholder="ニックネームを入力"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputForm
              type="password"
              title="パスワード"
              placeholder="パスワードを入力"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <InputForm
              type="password"
              title="パスワード"
              placeholder="パスワードを入力(確認用)"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              value={passwordConfirm}
            />
            <FormButton>アカウントを作成</FormButton>
          </Form>
        </WrapperInner>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 80%;
  max-width: 1440px;
  margin: 0 auto;
  padding-right: 40px;
  padding-left: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WrapperInner = styled.div`
  width: 100%;
`;

const Title = styled.p`
  text-align: center;
  margin-top: 16px;
  font-size: 32px;
`;

const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
`;
