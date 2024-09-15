import { LoaderProps } from '@/components/common/Loader';

type ManualLoadingHandleProps = LoaderProps & {
  handleLoading?(isLoading: boolean): void;
  handleError?(e: unknown): void;
};

export type { ManualLoadingHandleProps };
