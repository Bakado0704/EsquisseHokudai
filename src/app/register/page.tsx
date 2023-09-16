"use client";

import { FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { emailRegister } from "@/helpers/api-util";

export default function Page() {
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  async function submitFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;

    if (enteredEmail) {
      await emailRegister(enteredEmail, "testPassword").then(() => {
        router.push("/register/email-send");
      });
    }
  }

  return (
    <div>
      <h1>アカウントの作成</h1>
      <p>
        EsquisseChatのアカウントを作成するために、メールアドレスとパスワードをご入力下さい。
      </p>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <button>メールを送信する</button>
      </form>
    </div>
  );
}
