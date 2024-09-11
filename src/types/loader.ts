import { LoaderProps } from '@/components/common/Loader';

interface ManualLoadingHandleProps extends LoaderProps {
  handleLoading?(isLoading: boolean): void;
}

export type { ManualLoadingHandleProps };
