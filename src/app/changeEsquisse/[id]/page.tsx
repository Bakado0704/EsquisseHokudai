"use client";

import NavHeader from "@/components/nav/NavHeader/NavHeader";
import { changeEsquisse } from "@/helpers/api-change";
import { RootState } from "@/store/store";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";
import { useSelector } from "react-redux";

type Props = {
  params: Params;
};

export default function Page(props: Props) {
  const descriptionInputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();
  const postedKey = props.params.id;
  const esquisses = useSelector((state: RootState) => state.post.esquisses);
  const selectedEsquisse = esquisses.find(
    (esquisse) => esquisse.key === postedKey
  );
  const selectedPostId = selectedEsquisse?.id;
  //@ts-ignore
  const index = esquisses.indexOf(selectedEsquisse);

  async function submitFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const enteredDescription = descriptionInputRef.current?.value;

    await changeEsquisse(
      //@ts-ignore
      selectedPostId,
      postedKey,
      index,
      enteredDescription
    ).then(() => {
      router.push(`/esquisse/${selectedPostId}`);
    });
  }

  return (
    <div>
      <NavHeader />
      <h1>エスキス修正</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="description">メッセージを変更する</label>
          <input type="text" id="description" ref={descriptionInputRef} />
        </div>
        <button>投稿する</button>
      </form>
    </div>
  );
}
