import type { Metadata } from "next";
import "./global.css";
import Nav from "./Nav";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "A Issue Tracker to Track your Issues and hopefully resolve them",  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          <Theme appearance="light" grayColor="sage" radius="large" scaling="110%">
          <Nav />
          <main className="Background">{children}</main>
        </Theme>
      </body>
    </html>
  );
}
