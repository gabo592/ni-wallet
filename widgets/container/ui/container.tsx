import { FC } from 'react';
import { ContainerProps } from '../model/types';

export const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <main className="flex flex-col items-center gap-8 p-4">{children}</main>
  );
};
