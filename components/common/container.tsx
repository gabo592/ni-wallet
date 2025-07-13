import { FC, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <main className="flex flex-col items-center p-4 gap-8">{children}</main>
  );
};
