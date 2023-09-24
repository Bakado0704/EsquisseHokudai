"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createAccount } from "@/helpers/api-util";
import { NavHeader } from "@/components/nav/NavHeader/NavHeader";
import styled, { css } from "styled-components";
import { InputFrom } from "@/components/register/inputForm";
import { NavRegisterFooter } from "@/components/nav/NavFooter/NavRegisterFooter";
import { SubmitButton } from "@/components/button/SubmitButton";

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState<string>();
  const [passwordInput, setPasswordInput] = useState<string>();
  const [passwordConfirm, setPasswordConfirm] = useState<string>();

  async function submitFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (name && passwordInput && passwordInput === passwordConfirm) {
      createAccount(name, passwordInput).then(() => {
        router.push("/home");
      });
    }
  }

  const nameHandler = () => {
    //@ts-ignore
    const enteredName = document.getElementById("name").value;
    setName(enteredName);
  };

  const passwordInputHandler = () => {
    //@ts-ignore
    const enteredPassword = document.getElementById("passwordInput").value;
    setPasswordInput(enteredPassword);
  };

  const passwordConfirmHandler = () => {
    //@ts-ignore
    const enteredPassword = document.getElementById("passwordInput").value;
    setPasswordConfirm(enteredPassword);
  };

  return (
    <>
      <NavHeader />
      <Wrapper>
        <WrapperInner>
          <Title>メールアドレスの受信が確認されました！</Title>
          <Form onSubmit={submitFormHandler}>
            <InputFrom
              type="name"
              title="ニックネーム"
              placeholder="ニックネームを入力"
              onChange={nameHandler}
              value={name}
            />
            <InputFrom
              type="passwordInput"
              title="パスワード"
              placeholder="パスワードを入力"
              onChange={passwordInputHandler}
              value={passwordInput}
            />
            <InputFrom
              type="passwordInput"
              title="パスワード"
              placeholder="パスワードを入力(確認用)"
              onChange={passwordConfirmHandler}
              value={passwordConfirm}
            />
            <SubmitButton>アカウントを作成</SubmitButton>
          </Form>
        </WrapperInner>
      </Wrapper>
      <NavRegisterFooter />
    </>
  );
}

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
