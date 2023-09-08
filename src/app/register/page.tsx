"use client";

import { FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { styled } from "styled-components";

export default function Page() {
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  async function submitFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    router.push("/register/email-send");
  }

  return (
    <div>
      <h1>アカウントの作成</h1>
      <p>EsquisseChatのアカウントを作成するために、メールアドレスをご入力下さい。</p>
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

// const Button = styled.p<{ $primary?: boolean; }>`
//   --accent-color: white;

//   /* This renders the buttons above... Edit me! */
//   background: transparent;
//   border-radius: 3px;
//   border: 1px solid var(--accent-color);
//   color: var(--accent-color);
//   display: inline-block;
//   margin: 0.5rem 1rem;
//   padding: 0.5rem 0;
//   transition: all 200ms ease-in-out;
//   width: 11rem;

//   &:hover {
//     filter: brightness(0.85);
//   }

//   &:active {
//     filter: brightness(1);
//   }

//   /* The GitHub button is a primary button
//    * edit this to target it specifically! */
//   ${props => props.$primary && css`
//     background: var(--accent-color);
//     color: black;
//   `}
// `
