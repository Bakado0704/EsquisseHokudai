"use client";

import { getUser, signout } from "@/helpers/api-util";
import { useRouter } from "next/navigation";
import styled, { css } from "styled-components";

export const NavHeader = () => {
  const router = useRouter();
  const user = getUser();

  async function loginHandler() {
    await signout().then(() => {
      router.push("/login");
    });
  }

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
      {!user?.displayName && (
        <WrapperInner>
          <Button $login={true} onClick={loginHandler}>
            EsquisseChat
          </Button>
          <Button $signin={true} onClick={signinHandler}>
            サインイン
          </Button>
        </WrapperInner>
      )}
      {user?.displayName && (
        <WrapperInner>
          <WrapperInner $primary={true}>
            <Button $home={true} onClick={homeHandler}>
              ホーム
            </Button>
            <Button onClick={categoryHandler}>カテゴリ</Button>
          </WrapperInner>
          <Button $logout={true} onClick={logoutHandler}>
            ログアウト
          </Button>
        </WrapperInner>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  --background-color: #595757;

  position: fixed;
  top: 0;
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
      padding-right: 0;
      padding-left: 0;
    `}
`;

const Button = styled.button<{
  $signin?: boolean;
  $login?: boolean;
  $logout?: boolean;
  $home?: boolean;
}>`
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

  ${(props) =>
    props.$login &&
    css`
      --main-color: #f8b62d;

      color: var(--main-color);
      font-size: 20px;
      padding: 16px;
      transform: translate(-16px);
    `}

    ${(props) =>
    props.$logout &&
    css`
      transform: translate(16px);
    `}

      ${(props) =>
    props.$home &&
    css`
      transform: translate(-16px);
    `}
`;
