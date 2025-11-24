import type { Metadata } from "next";
import "./global.css";
import Nav from "./Nav";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import Footer from "./Footer";
import StoreProvider from "../../redux/StoreProvider";
import AuthProvider from "./Auth";

export const metadata: Metadata = {
  title: "Issue Tracker",
  description:
    "A Issue Tracker to Track your Issues and hopefully resolve them",
  applicationName: "Issue Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className="min-h-screen flex flex-col overflow-y-scroll scrollbar-hide">
          <AuthProvider>
            <Theme
              appearance="dark"
              grayColor="sage"
              radius="large"
              scaling="100%"
            >
              <Nav />
              <main className="flex-1 grow">{children}</main>
              <Footer />
            </Theme>
          </AuthProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
