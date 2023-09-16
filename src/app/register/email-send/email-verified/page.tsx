"use client";

import { FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { createAccount } from "@/helpers/api-util";

export default function Page() {
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  function submitFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredName = nameInputRef.current?.value;
    const enteredInputPassword = passwordInputRef.current?.value;
    const enteredConfirmPassword = passwordConfirmRef.current?.value;

    if (
      enteredName &&
      enteredInputPassword &&
      enteredInputPassword === enteredConfirmPassword
    ) {
      createAccount(enteredName, enteredInputPassword).then(() => {
        router.push("/home");
      });
    }
  }

  return (
    <div>
      <h1>メールアドレスの受信が確認されました！</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="name">ニックネーム</label>
          <input type="text" id="name" ref={nameInputRef} />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input type="password" id="passwordInput" ref={passwordInputRef} />
        </div>
        <div>
          <label htmlFor="password">パスワード(確認用)</label>
          <input
            type="password"
            id="passwordConfirm"
            ref={passwordConfirmRef}
          />
        </div>
        <button>アカウントを作成</button>
      </form>
    </div>
  );
}
