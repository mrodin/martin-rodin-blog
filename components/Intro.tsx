import { FC } from "react";
import Link from "next/link";

const Intro: FC = () => (
  <section className="mt-16 mb-16 flex md:mb-12">
    <Link
      href="/"
      className="gradient-title text-6xl font-bold leading-tight tracking-tighter no-underline md:pr-8 md:text-6xl"
    >
      Martin Rodin
    </Link>
  </section>
);

export default Intro;
