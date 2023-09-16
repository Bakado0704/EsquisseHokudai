"use client";

import NavHeader from "@/components/nav/NavHeader/NavHeader";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  function resubmitHandler() {
    router.push("/register/email-send");
  }

  return (
    <div>
      <NavHeader />
      <h1>メールアドレス受信確認用のメールを送信しました。</h1>
      <p>kado_hiroki@eis.hokudai.ac.jp宛に受信確認用メールが送信されました。</p>
      <p>メールをご確認いただき、メールに記載されたURLをクリックして、メールアドレスの受信確認を完了してください。</p>
      <button onClick={resubmitHandler}>メールを再送信する</button>
    </div>
  );
}
