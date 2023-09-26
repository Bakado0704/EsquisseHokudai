"use client";

import { ReSubmitButton } from "@/components/button/ReSubmitButton";
import { NavRegisterFooter } from "@/components/nav/NavFooter/NavRegisterFooter";
import { NavHeader } from "@/components/nav/NavHeader/NavHeader";
import { emailRegister, getUser } from "@/helpers/api-util";
import { useRouter } from "next/navigation";
import styled from "styled-components";

export default function Page() {
  const router = useRouter();
  const user = getUser();

  async function resubmitHandler() {
    if (user) {
      await emailRegister(user.email!, "testPassword").then(() => {
        router.push("/register/email-send");
      });
    }
  }

  return (
    <>
      <NavHeader />
      {!user && <p>sending...</p>}
      {user && (
        <Wrapper>
          <WrapperInner>
            <Title>メールアドレス受信確認用のメールを送信しました。</Title>
            <Description>
              {user?.email}宛に受信確認用メールが送信されました。
            </Description>
            <Description>
              メールをご確認いただき、メールに記載されたURLをクリックして、メールアドレスの受信確認を完了してください。
            </Description>
            <ReSubmitButton>メールを送信する</ReSubmitButton>
          </WrapperInner>
        </Wrapper>
      )}
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

const Description = styled.p`
  text-align: center;
  margin-top: 16px;
  font-size: 16px;
`;
