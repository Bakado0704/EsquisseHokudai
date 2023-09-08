"use client";

import Link from "next/link";

export default function Page() {

  return (
    <div>
      <h1>ホーム</h1>
      <Link href="/post">投稿する</Link>
    </div>
  );
}
