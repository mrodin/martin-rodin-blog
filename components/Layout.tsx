import { ReactNode } from "react";

import { Footer } from "./Footer";
import Meta from "./meta";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => (
  <>
    <Meta />
    <div className="min-h-screen">{children}</div>
    <Footer />
  </>
);
