"use client";

import { NavRegisterFooter } from "@/components/nav/NavFooter/NavRegisterFooter";
import { NavHeader } from "@/components/nav/NavHeader/NavHeader";
import { getUser } from "@/helpers/api-database";
import styled from "styled-components";

export default function Page() {
  const user = getUser();

  return (
    <>
      <NavHeader />
      {!user && <p>loading...</p>}
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
