"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { emailRegister } from "@/helpers/api-util";
import { NavHeader } from "@/components/nav/NavHeader/NavHeader";
import styled from "styled-components";
import { SubmitButton } from "@/components/button/SubmitButton";
import { InputFrom } from "@/components/register/inputForm";
import { NavRegisterFooter } from "@/components/nav/NavFooter/NavRegisterFooter";

export default function Page() {
  const [email, setEmail] = useState<string>();
  const router = useRouter();

  async function submitFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (email) {
      await emailRegister(email, "testPassword").then(() => {
        router.push("/register/email-send");
      });
    }
  }

  return (
    <>
      <NavHeader />
      <Wrapper>
        <WrapperInner>
          <Title>アカウントの作成</Title>
          <Description>
            EsquisseChatのアカウントを作成するために、メールアドレスとパスワードをご入力下さい。
          </Description>
          <Form onSubmit={submitFormHandler}>
            <InputFrom
              type="email"
              title="メールアドレス"
              placeholder="メールアドレスを入力"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <SubmitButton>メールを送信する</SubmitButton>
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

const Form = styled.form`
  max-width: 500px;
  margin: 0 auto;
`;

const Title = styled.p`
  text-align: center;
  margin-top: 16px;
  font-size: 32px;
`;

const Description = styled.p`
  text-align: center;
  margin-top: 16px;
  font-size: 16px;
`;
