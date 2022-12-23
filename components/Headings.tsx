import Link from "next/link";
import { FC, ReactNode } from "react";

type HeadingProps = {
  children: ReactNode;
};

export const IndexHeading: FC<HeadingProps> = ({ children }) => (
  <Link href="/" className="no-underline">
    <h1 className="gradient-title text-6xl font-bold leading-tight tracking-tighter no-underline md:pr-8 md:text-6xl">
      {children}
    </h1>
  </Link>
);

export const PostPreviewHeading: FC<HeadingProps> = ({ children }) => (
  <h2 className="mb-3 text-4xl font-bold leading-tight tracking-tighter text-neutral-200">
    {children}
  </h2>
);
