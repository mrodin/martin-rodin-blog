import Link from "next/link";
import { FC } from "react";

export const HomeLink: FC = () => (
  <div className="text-2xl md:text-4xl font-bold tracking-tight text-neutral-200 md:tracking-tighter leading-tight mb-20 mt-8">
    <Link href="/">Martin Rodin</Link>
  </div>
);
