import type { ModalBodyProps } from '@/types/modal';

import { StyledModalBody } from './styled';

export const ModalBody = ({ children }: ModalBodyProps) => (
  <StyledModalBody>{children}</StyledModalBody>
);
