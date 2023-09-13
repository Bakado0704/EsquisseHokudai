"use client";

import { store } from "@/store/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function MyApp({ Component, pageProps }: AppProps) {
  console.log("test");

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
