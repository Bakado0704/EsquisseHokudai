"use client";

import { getUser, signout } from "@/helpers/api-util";
import { useRouter } from "next/navigation";
import styled, { css } from "styled-components";

export default function NavHeader() {
  const router = useRouter();
  const user = getUser();

  function homeHandler() {
    router.push("/home");
  }

  function signinHandler() {
    router.push("/register");
  }

  function categoryHandler() {
    router.push("/category");
  }

  async function logoutHandler() {
    await signout().then(() => {
      router.push("/login");
    });
  }

  return (
    <Wrapper>
      {!user && (
        <WrapperInner>
          <Logo>EsquisseChat</Logo>
          <Button $signin={true} onClick={signinHandler}>
            サインイン
          </Button>
        </WrapperInner>
      )}
      {user && (
        <WrapperInner>
          <WrapperInner $primary={true}>
            <Button onClick={homeHandler}>ホーム</Button>
            <Button onClick={categoryHandler}>カテゴリ</Button>
          </WrapperInner>
          <Button onClick={logoutHandler}>ログアウト</Button>
        </WrapperInner>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  --background-color: #595757;

  position: fixed;
  top:0;
  height: 80px;
  width: 100%;
  align-items: center;
  display: flex;
  background-color: var(--background-color);
  padding-top: 0;
  border-bottom: solid 2px white; 
`;

const WrapperInner = styled.div<{ $primary?: boolean }>`
  display: flex;
  width: 100%;
  padding-right: 40px;
  padding-left: 40px;
  max-width: 1440px;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

  ${(props) =>
    props.$primary &&
    css`
      width: 80%;
      justify-content: left;
      margin-left: 0;
    `}
`;

const Logo = styled.p`
  --main-color: #f8b62d;

  color: var(--main-color);
  font-size: 20px;
  padding: 16px;
  transform: translate(-16px);
`;

const Button = styled.button<{ $signin?: boolean }>`
  background: transparent;
  color: white;
  display: block;
  padding: 16px;

  &:hover {
    filter: brightness(0.85);
  }

  ${(props) =>
    props.$signin &&
    css`
      transform: translate(16px);
    `}
`;
