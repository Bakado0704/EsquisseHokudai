"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createAccount } from "@/helpers/api-util";
import { NavHeader } from "@/components/nav/NavHeader/NavHeader";
import styled from "styled-components";
import { InputForm } from "@/components/form/InputForm";
import { NavRegisterFooter } from "@/components/nav/NavFooter/NavRegisterFooter";
import { FormButton } from "@/components/button/FormButton";

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

  return (
    <>
      <NavHeader />
      <Wrapper>
        <WrapperInner>
          <Title>メールアドレスの受信が確認されました！</Title>
          <Form onSubmit={submitFormHandler}>
            <InputForm
              type="name"
              title="ニックネーム"
              placeholder="ニックネームを入力"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <InputForm
              type="password"
              title="パスワード"
              placeholder="パスワードを入力"
              value={passwordInput}
              onChange={e => setPasswordInput(e.target.value)}
            />
            <InputForm
              type="password"
              title="パスワード"
              placeholder="パスワードを入力(確認用)"
              onChange={e => setPasswordConfirm(e.target.value)}
              value={passwordConfirm}
            />
            <FormButton>アカウントを作成</FormButton>
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
