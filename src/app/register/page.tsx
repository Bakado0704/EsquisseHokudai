"use client";

import { FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { emailRegister } from "@/helpers/api-util";
import {NavHeader} from "@/components/nav/NavHeader/NavHeader";
import styled, { css } from "styled-components";

export default function Page() {
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  async function submitFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;

    if (enteredEmail) {
      await emailRegister(enteredEmail, "testPassword").then(() => {
        router.push("/register/email-send");
      });
    }
  }

  return (
    <>
      <NavHeader />
      <Wrapper>
        <WrapperInner>
          <P $title={true}>アカウントの作成</P>
          <P>
            EsquisseChatのアカウントを作成するために、メールアドレスとパスワードをご入力下さい。
          </P>
          <form onSubmit={submitFormHandler}>
            <Div>
              <Label htmlFor="email">メールアドレス</Label>
              <Input type="email" id="email" ref={emailInputRef} />
            </Div>
            <Div $submit={true}>
              <Button>メールを送信する</Button>
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
    `}
`;

const Footer = styled.div`
  --background-color: #323131;

  width: 100%;
  height: 20%;
  background-color: var(--background-color);
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
