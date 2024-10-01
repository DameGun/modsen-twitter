import type { PropsWithChildren } from './common';

type ImageProps = PropsWithChildren & {
  url?: string;
};

type ImageWithKey = {
  id: number;
  url: string;
};

export type { ImageProps, ImageWithKey };
