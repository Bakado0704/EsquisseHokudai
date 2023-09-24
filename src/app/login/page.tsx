"use client";

import Link from "next/link";
import { FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/helpers/api-util";
import { NavHeader } from "@/components/nav/NavHeader/NavHeader";
import styled from "styled-components";
import { SubmitButton } from "@/components/button/SubmitButton";
import { InputFrom } from "@/components/register/inputForm";

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
            <InputFrom
              type="email"
              title="メールアドレス"
              placeholder="メールアドレスを入力"
              ref={emailInputRef}
            />
            <InputFrom
              type="password"
              title="パスワード"
              placeholder="パスワードを入力"
              ref={passwordInputRef}
            />
            <SubmitButton>ログイン</SubmitButton>
          </form>
          <LinkBox>
            <Link href="/register">アカウントを作成する</Link>
          </LinkBox>
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


const LinkBox = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  justify-content: center;
`;