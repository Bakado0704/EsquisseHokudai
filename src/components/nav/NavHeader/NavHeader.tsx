import Link from "next/link";

export default function Page() {
  return (
    <div>
      <p>アカウントの作成</p>
      <ul>
        <li>
          <Link href="/home">メールを送信する</Link>
        </li>
        <li>
          <Link href="/register/email-send">メールを送信する</Link>
        </li>
      </ul>
    </div>
  );
}

