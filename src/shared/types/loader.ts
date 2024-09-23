import type { LoaderProps } from '@/shared/ui/Loader';

type ManualLoadingHandleProps = LoaderProps & {
  handleLoading?(isLoading: boolean): void;
  handleError?(e: unknown): void;
};

export type { ManualLoadingHandleProps };
