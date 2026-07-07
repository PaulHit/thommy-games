"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import FooterClient from "./FooterClient";
import FloatingCTA from "./FloatingCTA";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStudio = pathname.startsWith("/studio");

  return (
    <>
      {!isStudio && <Header />}
      {children}
      {!isStudio && <FooterClient />}
      <FloatingCTA />
    </>
  );
}
