"use client";

import { FormEvent, useRef } from "react";

type Props = {
  postedId: string;
};

export default function EsquisseChange(props: Props) {
  //   const dispatch = useDispatch();
  const textInputRef = useRef<HTMLInputElement | null>(null);
  const enteredText = textInputRef.current?.value;

  async function submitFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const reqBody = {
      id: props,
      description: enteredText,
      createdAt: new Date().toDateString(),
      user: {
        id: "c1",
        username: "Bakado0704",
        email: "kado_hiroki@yahoo.co.jp",
        login: true,
        emailVerified: true,
        passwordHashed: "KadoHiroki",
      },
    };
  }

  return (
    <div>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="text">コメントを追加する。</label>
          <input type="text" id="text" ref={textInputRef} />
        </div>
        <button>メッセージを投稿する</button>
      </form>
    </div>
  );
}
