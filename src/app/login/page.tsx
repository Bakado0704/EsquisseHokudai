"use client";

import Link from "next/link";
import { FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";

export async function getAllEvents() {
  const response = await fetch(
    "https://react-getting-started-2a850-default-rtdb.firebaseio.com/posts.json"
  );
  const data = await response.json();

  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
}

export default function Login() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function submitFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const allDatas = await getAllEvents();

    console.log(allDatas);

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    const reqBody = { email: enteredEmail, password: enteredPassword };

    console.log(reqBody);

    router.push("/home");

    // fetch('/api/feedback', {
    //   method: 'POST',
    //   body: JSON.stringify(reqBody),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
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
