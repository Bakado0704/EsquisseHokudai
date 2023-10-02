"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createAccount } from "@/helpers/api-util";
import { NavHeader } from "@/components/nav/NavHeader/NavHeader";
import styled from "styled-components";
import { NavRegisterFooter } from "@/components/nav/NavFooter/NavRegisterFooter";
import { EmailVerified } from "@/components/register/EmailVerified";

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState<string>();
  const [passwordInput, setPasswordInput] = useState<string>();
  const [passwordConfirm, setPasswordConfirm] = useState<string>();
  const [uploading, setUploading] = useState(false);

  const submitFormHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploading(true);

    if (name && passwordInput && passwordInput === passwordConfirm) {
      createAccount(name, passwordInput).then(() => {
        setUploading(false);
        router.push("/");
      });
    }
  };

  return (
    <>
      <NavHeader />
      <EmailVerified
        uploading={uploading}
        submitFormHandler={submitFormHandler}
        name={name}
        setName={setName}
        passwordInput={passwordInput}
        setPasswordInput={setPasswordInput}
        setPasswordConfirm={setPasswordConfirm}
        passwordConfirm={passwordConfirm}
      />
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

const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
`;
