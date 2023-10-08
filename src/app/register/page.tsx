"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { NavHeader } from "@/components/nav/NavHeader/NavHeader";
import styled from "styled-components";
import { InputForm } from "@/components/form/InputForm";
import { NavRegisterFooter } from "@/components/nav/NavFooter/NavRegisterFooter";
import { FormButton } from "@/components/button/FormButton";
import { Uploading } from "@/components/bg/Uploading";
import { emailRegister, getUser } from "@/helpers/api-util";

export default function Page() {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [passwordInput, setPasswordInput] = useState<string>();
  const [passwordConfirm, setPasswordConfirm] = useState<string>();
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const submitFormHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploading(true);

    if (email && name && passwordInput && passwordInput === passwordConfirm) {
      await emailRegister(email, passwordInput, name).then(() => {
        const user = getUser();
        setUploading(false);

        if (user) {
          setUploading(false);
          router.push("/register/email-send");
        }
      });
    }
  };

  return (
    <>
      <NavHeader />
      <Wrapper>
        {uploading && <Uploading text="アカウント作成中..." />}
        <WrapperInner>
          <Title>アカウントの作成</Title>
          <Description>
            EsquisseChatのアカウントを作成するために、メールアドレス、ニックネーム、パスワードをご入力下さい。
          </Description>
          <Form onSubmit={submitFormHandler}>
            <InputForm
              type="email"
              title="メールアドレス"
              placeholder="メールアドレスを入力"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
            <FormButton>メールを送信する</FormButton>
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
