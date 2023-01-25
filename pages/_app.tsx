import "@/styles/global.css";
import "react-calendar/dist/Calendar.css";

import type { AppProps } from "next/app";
import { AppProvider } from "../context";
import App from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}
