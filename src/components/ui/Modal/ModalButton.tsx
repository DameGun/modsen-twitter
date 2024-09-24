import type { ModalButtonProps } from '@/types/modal';

import { ModalContext } from './context';

export function ModalButton({ children }: ModalButtonProps) {
  return <ModalContext.Consumer>{(context) => children(context)}</ModalContext.Consumer>;
}
