"use client";

import { FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { createAccount } from "@/helpers/api-util";
import NavHeader from "@/components/nav/NavHeader/NavHeader";
import styled, { css } from "styled-components";

export default function Page() {
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  async function submitFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredName = nameInputRef.current?.value;
    const enteredInputPassword = passwordInputRef.current?.value;
    const enteredConfirmPassword = passwordConfirmRef.current?.value;

    if (
      enteredName &&
      enteredInputPassword &&
      enteredInputPassword === enteredConfirmPassword
    ) {
      createAccount(enteredName, enteredInputPassword).then(() => {
        router.push("/home");
      });
    }
  }

  return (
    <>
      <NavHeader />
      <Wrapper>
        <WrapperInner>
          <P $title={true}>メールアドレスの受信が確認されました！</P>
          <form onSubmit={submitFormHandler}>
            <Div>
              <Label htmlFor="name">ニックネーム</Label>
              <Input type="text" id="name" ref={nameInputRef} />
            </Div>
            <Div>
              <Label htmlFor="password">パスワード</Label>
              <Input
                type="password"
                id="passwordInput"
                ref={passwordInputRef}
              />
            </Div>
            <Div>
              <Label htmlFor="password">パスワード(確認用)</Label>
              <Input
                type="password"
                id="passwordConfirm"
                ref={passwordConfirmRef}
              />
            </Div>
            <Div $submit={true}>
              <Button>アカウントを作成</Button>
            </Div>
          </form>
        </WrapperInner>
      </Wrapper>
      <Footer />
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

const P = styled.p<{ $title?: boolean }>`
  text-align: center;
  font-size: 16px;
  margin-top: 16px;

  ${(props) =>
    props.$title &&
    css`
      font-size: 32px;
      margin-bottom: 16px;
    `}
`;

const Div = styled.div<{ $submit?: boolean }>`
  display: block;
  width: 100%;
  max-width: 400px;
  margin: 32px auto 0;

  ${(props) =>
    props.$submit &&
    css`
      display: flex;
      justify-content: center;
    `}
`;

const Label = styled.label`
  align: top;
`;

const Input = styled.input`
  --border-color: #c9caca;
  --text-color: #323131;

  display: block;
  width: 100%;
  padding: 6px;
  font-size: 12px;
  margin-top: 2px;
  background-color: white;
  color: var(--text-color);
  border: solid 2px var(--border-color);
  border-radius: 4px;
`;

const Button = styled.button`
  --border-color: #c9caca;
  --text-color: #323131;

  display: block;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 32px;
  padding-left: 32px;
  background-color: white;
  color: var(--text-color);
  border: solid 2px var(--border-color);
  border-radius: 10px;
`;

const Footer = styled.div`
  --background-color: #323131;

  width: 100%;
  height: 20%;
  background-color: var(--background-color);
`;