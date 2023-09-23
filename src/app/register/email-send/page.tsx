"use client";

import { NavHeader } from "@/components/nav/NavHeader/NavHeader";
import { emailRegister, getUser } from "@/helpers/api-util";
import { useRouter } from "next/navigation";
import styled, { css } from "styled-components";

export default function Page() {
  const router = useRouter();

  const user = getUser();

  async function resubmitHandler() {
    if (user) {
      await emailRegister(user?.email, "testPassword").then(() => {
        router.push("/register/email-send");
      });
    }
  }

  return (
    <>
      <NavHeader />
      {!user && <p>sending...</p>}
      {user && (
        <>
          <Wrapper>
            {" "}
            <WrapperInner>
              <P $title={true}>
                メールアドレス受信確認用のメールを送信しました。
              </P>
              <P>{user?.email}宛に受信確認用メールが送信されました。</P>
              <P>
                メールをご確認いただき、メールに記載されたURLをクリックして、メールアドレスの受信確認を完了してください。
              </P>
              <Div>
                <Button onClick={resubmitHandler}>メールを再送信する</Button>
              </Div>
            </WrapperInner>
          </Wrapper>
        </>
      )}
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

const Div = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 48px auto 0;
  display: flex;
  justify-content: center;
`;
