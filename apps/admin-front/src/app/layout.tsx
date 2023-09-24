import "@/styles/globals.css";
import "@/store/init";
import { attachReduxDevTools } from "@effector/redux-devtools-adapter";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// https://github.com/effector/redux-devtools-adapter
attachReduxDevTools();

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
