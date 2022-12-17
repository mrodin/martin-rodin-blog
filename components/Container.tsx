import { FC, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export const Container: FC<ContainerProps> = ({ children }) => (
  <div className="container mx-auto px-5 max-w-screen-md">{children}</div>
);
