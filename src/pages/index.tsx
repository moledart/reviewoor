import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { Lora, Cormorant, Vollkorn, EB_Garamond } from "@next/font/google";

import { trpc } from "../utils/trpc";

const playfair = Cormorant({
  subsets: ["cyrillic", "latin"],
  variable: "--font-playfair",
});

const Home: NextPage = () => {
  return (
    <>
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
      <main
        className={`flex min-h-screen flex-col items-center justify-center ${playfair.className}`}
      >
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <img src="/logo.png" alt="" />
          <h1 className="text-3xl font-bold">Start the reviewoooring</h1>
        </div>
      </main>
    </>
  );
};

export default Home;
