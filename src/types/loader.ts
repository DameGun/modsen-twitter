import { LoaderProps } from '@/components/common/Loader';

type ManualLoadingHandleProps = LoaderProps & {
  handleLoading?(isLoading: boolean): void;
};

export type { ManualLoadingHandleProps };
