"use client";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { FormEvent, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { IndicatePost } from "@/store/post";

type Props = {
  postedId: string;
};

export default function FormEsquisse(props: Props) {
  //   const dispatch = useDispatch();
  const textInputRef = useRef<HTMLInputElement | null>(null);
  const enteredText = textInputRef.current?.value;

  //   useEffect(() => {
  //     getAllPosts().then(function (result) {
  //       dispatch(IndicatePost(result));
  //     });
  //   }, [dispatch]);

  async function submitFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(enteredText);

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

    console.log(reqBody);

    await fetch(
        "https://react-getting-started-2a850-default-rtdb.firebaseio.com/esquisse.json",
        {
          method: "POST",
          body: JSON.stringify(reqBody),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
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
