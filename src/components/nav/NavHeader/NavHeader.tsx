"use client";

import { getUser, signout } from "@/helpers/api-util";
import { useRouter } from "next/navigation";
import styled from "styled-components";

export const NavHeader = () => {
  const router = useRouter();
  const user = getUser();

  const loginHandler = async () => {
    const activeUser = getUser();

    if (activeUser) {
      router.push("/");
    } else {
      await signout().then(() => {
        router.push("/login");
      });
    }
  };

  const signinHandler = () => {
    const activeUser = getUser();

    if (activeUser) {
      router.push("/");
    } else {
      router.push("/register");
    }
  };

  const homeHandler = () => {
    router.push("/");
  };

  const categoryHandler = () => {
    router.push("/category");
  };

  const logoutHandler = async () => {
    await signout().then(() => {
      router.push("/login");
    });
  };

  return (
    <Wrapper>
      {!user?.emailVerified && (
        <WrapperInner>
          <LogoButton onClick={loginHandler}>EsquisseChat</LogoButton>
          <SigninButton onClick={signinHandler}>サインイン</SigninButton>
        </WrapperInner>
      )}
      {user?.emailVerified && (
        <WrapperInner>
          <ButtonsRight>
            <HomeButton onClick={homeHandler}>ホーム</HomeButton>
            <CategoryButton onClick={categoryHandler}>カテゴリ</CategoryButton>
          </ButtonsRight>
          <LogoutButton onClick={logoutHandler}>ログアウト</LogoutButton>
        </WrapperInner>
      )}
    </Wrapper>
  );
};

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

const WrapperInner = styled.div`
  width: 100%;
  padding-right: 40px;
  padding-left: 40px;
  max-width: 1440px;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
`;

const ButtonsRight = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  justify-content: left;
  margin-left: 0;
  padding-right: 0;
  padding-left: 0;
`;

const SigninButton = styled.button`
  transform: translate(16px);
  color: white;
  display: block;
  padding: 16px;

  &:hover {
    filter: brightness(0.85);
  }
`;

const LogoButton = styled.button`
  --main-color: #f8b62d;

  color: var(--main-color);
  display: block;
  padding: 16px;
  font-size: 20px;
  transform: translate(-16px);
`;

const HomeButton = styled.button`
  transform: translate(-16px);
  color: white;
  display: block;
  padding: 16px;

  &:hover {
    filter: brightness(0.85);
  }
`;

const CategoryButton = styled.button`
  color: white;
  display: block;
  padding: 16px;

  &:hover {
    filter: brightness(0.85);
  }
`;

const LogoutButton = styled.button`
  color: white;
  display: block;
  padding: 16px;
  transform: translate(16px);

  &:hover {
    filter: brightness(0.85);
  }
`;
