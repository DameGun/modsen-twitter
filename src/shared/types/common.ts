import type { ReactNode } from 'react';

type ChildrenProps = {
  children?: ReactNode;
};

type PropsWithChildren<T = undefined> = T extends undefined ? ChildrenProps : T & ChildrenProps;

export type { PropsWithChildren };
