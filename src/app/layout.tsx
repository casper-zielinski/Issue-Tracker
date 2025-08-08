import type { Metadata } from "next";
import "./global.css";
import Nav from "./Nav";
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import Footer from "./Footer";

export const metadata: Metadata = {
  title: "Issue Tracker",
  description:
    "A Issue Tracker to Track your Issues and hopefully resolve them",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme appearance="dark" grayColor="sage" radius="large" scaling="90%">
          <Nav />
          <main>{children}</main>
          <ThemePanel />
          <Footer />
        </Theme>
      </body>
    </html>
  );
}
