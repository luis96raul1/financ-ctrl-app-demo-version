import Head from "next/head";
import { Navbar } from "../ui";

export const Layout = ({ children, title, navbar, backNavigation }) => {
  return (
    <>
      <Head>
        <title>{title || "My finantial App"}</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="author" content="Luis Raul" />
        <meta
          name="description"
          content={`Información sobre página ${title}`}
        />
        <meta
          name="keywords"
          content={`finantial-control, business, ${title}`}
        />
      </Head>
      {navbar && <Navbar backNavigation={backNavigation} title={title} />}
      <main
        style={{
          padding: "0 20px",
        }}
      >
        {children}
      </main>
    </>
  );
};
