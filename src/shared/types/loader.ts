import { PropsWithChildren } from './common';
import { FormatStyledProps } from './styles';

type StyledLoaderProps = {
  $isLoaderFullScreen?: boolean;
};

type BaseLoaderProps = {
  isLoading: boolean;
};

type LoaderProps = FormatStyledProps<StyledLoaderProps> &
  PropsWithChildren<Partial<BaseLoaderProps>>;

type ManualLoadingHandleProps = LoaderProps & {
  handleLoading?(isLoading: boolean): void;
  handleError?(e: unknown): void;
};

export type { LoaderProps, ManualLoadingHandleProps, StyledLoaderProps };
