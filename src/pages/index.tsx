import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import Navigation from "../components/Navigation";

const Home: NextPage = () => {
  const { data: session } = useSession();

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
      <Navigation />
      <main className="flex  flex-col items-center justify-center">
        <div></div>
      </main>
    </>
  );
};

export default Home;
