"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { NavHeader } from "@/components/nav/NavHeader/NavHeader";
import styled from "styled-components";
import { InputForm } from "@/components/form/InputForm";
import { NavRegisterFooter } from "@/components/nav/NavFooter/NavRegisterFooter";
import { FormButton } from "@/components/button/FormButton";
import { getUser, signIn } from "@/helpers/api-util";

export default function Page() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const router = useRouter();

  const submitFormHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email && password) {
      await signIn(email, password).then(() => {
        const user = getUser();

        if (user) {
          router.push("/");
        }
      });
    }
  };

  return (
    <>
      <NavHeader />
      <Wrapper>
        <WrapperInner>
          <Title>ログイン</Title>
          <Form onSubmit={submitFormHandler}>
            <InputForm
              type="email"
              title="メールアドレス"
              placeholder="メールアドレスを入力"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputForm
              type="password"
              title="パスワード"
              placeholder="パスワードを入力"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormButton>ログイン</FormButton>
          </Form>
          <LinkBox>
            <Link href="/register">アカウントを作成する</Link>
          </LinkBox>
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
  max-width: 400px;
`;

const Title = styled.p`
  text-align: center;
  font-size: 24px;
`;

const LinkBox = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
`;
