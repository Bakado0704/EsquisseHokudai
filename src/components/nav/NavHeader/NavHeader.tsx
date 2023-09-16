"use client";

import { signout } from "@/helpers/api-util";
import { useRouter } from "next/navigation";

export default function NavHeader() {
  const router = useRouter();

  async function homeHandler() {
    router.push("/home");
  }

  async function logoutHandler() {
    await signout().then(() => {
      router.push("/login");
    });
  }

  return (
    <div>
      <button onClick={homeHandler}>ホーム</button>
      <button onClick={logoutHandler}>ログアウト</button>
    </div>
  );
}
