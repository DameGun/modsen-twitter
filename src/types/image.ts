import type { ReactNode } from 'react';

type ImageProps = {
  url?: string;
  children?: ReactNode;
};

type ImageWithKey = {
  id: number;
  url: string;
};

export type { ImageProps, ImageWithKey };
