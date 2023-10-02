"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createAccount } from "@/helpers/api-util";
import { NavHeader } from "@/components/nav/NavHeader/NavHeader";
import styled from "styled-components";
import { InputForm } from "@/components/form/InputForm";
import { NavRegisterFooter } from "@/components/nav/NavFooter/NavRegisterFooter";
import { FormButton } from "@/components/button/FormButton";
import { Uploading } from "@/components/bg/Uploading";

export default function Page() {

  return (
    <>
      <NavHeader />
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
