import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Provider } from "jotai";
import "../styles/globals.css";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { trpc } from "../utils/trpc";
import Head from "next/head";
import { useLocalStorage } from "@mantine/hooks";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <SessionProvider session={session}>
      <Provider>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withCSSVariables
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme,
            }}
          >
            <Head>
              <title>Reviewoor</title>
              <meta name="description" content="All reviews in one place" />
              <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="favicon/apple-touch-icon.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="favicon/favicon-32x32.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="favicon/favicon-16x16.png"
              />
              <link rel="manifest" href="favicon/site.webmanifest" />
            </Head>
            <Component {...pageProps} />
          </MantineProvider>
        </ColorSchemeProvider>
      </Provider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
