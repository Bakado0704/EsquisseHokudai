"use client";

import Link from "next/link";
import { FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/helpers/api-util";

export default function Login() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function submitFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    if (enteredEmail && enteredPassword) {
      await signIn(enteredEmail, enteredPassword).then(() => {
        router.push("/home");
      });
    }
  }

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input type="password" id="password" ref={passwordInputRef} />
        </div>
        <button>ログイン</button>
      </form>
      <Link href="/register">アカウントを作成する</Link>
    </div>
  );
}
