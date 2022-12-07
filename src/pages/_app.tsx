import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Provider } from "jotai";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import Theme from "../components/Theme";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Provider>
        <Theme>
          <Component {...pageProps} />
        </Theme>
      </Provider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
