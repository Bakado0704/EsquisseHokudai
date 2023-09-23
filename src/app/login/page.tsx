"use client";

import Link from "next/link";
import { FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/helpers/api-util";
import { NavHeader } from "@/components/nav/NavHeader/NavHeader";
import styled, { css } from "styled-components";

export default function Login() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function submitFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    if (enteredEmail && enteredPassword) {
      await signIn(enteredEmail, enteredPassword).then(() => {
        router.push("/home");
      });
    }
  }

  return (
    <>
      <NavHeader />
      <Wrapper>
        <WrapperInner>
          <P>ログイン</P>
          <form onSubmit={submitFormHandler}>
            <Div>
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                type="email"
                id="email"
                placeholder="メールアドレスを入力"
                ref={emailInputRef}
              />
            </Div>
            <Div>
              <Label htmlFor="password">パスワード</Label>
              <Input
                type="password"
                id="password"
                placeholder="パスワードを入力"
                ref={passwordInputRef}
              />
            </Div>
            <Div $login={true}>
              <Button>ログイン</Button>
            </Div>
          </form>
          <Div $account={true}>
            <Link href="/register">アカウントを作成する</Link>
          </Div>
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
  max-width: 400px;
`;

const P = styled.p`
  text-align: center;
  font-size: 24px;
`;

const Footer = styled.div`
  --background-color: #323131;

  width: 100%;
  height: 20%;
  background-color: var(--background-color);
`;

const Button = styled.button`
  --border-color: #c9caca;
  --text-color: #323131;

  display: block;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 32px;
  padding-left: 32px;
  margin-top: 20px;
  background-color: white;
  color: var(--text-color);
  border: solid 2px var(--border-color);
  border-radius: 10px;
`;

const Div = styled.div<{ $login?: boolean; $account?: boolean }>`
  display: block;
  width: 100%;
  margin-top: 16px;

  ${(props) =>
    props.$login &&
    css`
      display: flex;
      justify-content: center;
    `}

  ${(props) =>
    props.$account &&
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
