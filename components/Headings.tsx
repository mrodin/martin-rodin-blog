import Link from "next/link";
import { FC, ReactNode } from "react";

type H1Props = {
  children: ReactNode;
};

export const IndexHeading: FC<H1Props> = ({ children }) => (
  <Link href="/" className="no-underline">
    <h1 className="gradient-title text-6xl font-bold leading-tight tracking-tighter no-underline md:pr-8 md:text-6xl">
      {children}
    </h1>
  </Link>
);
