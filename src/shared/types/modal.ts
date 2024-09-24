import type { ReactElement, ReactNode, SyntheticEvent } from 'react';

import type { PropsWithChildren } from './common';

type ChildrenWithContext = ((context: ModalContextType) => ReactNode) | ReactNode;

type ModalContextType = {
  isOpen: boolean;
  isFormValid: boolean;
  handleFormValidation(isValid: boolean): void;
  handleOpen(
    callback?: (e: SyntheticEvent) => Promise<void>
  ): (e: SyntheticEvent) => Promise<SyntheticEvent>;
  handleClose(
    callback?: (e: SyntheticEvent) => Promise<void>
  ): (e: SyntheticEvent) => Promise<SyntheticEvent>;
};

type ModalProps = {
  children: ModalChildren;
};

type ModalBodyProps = {
  children: ChildrenWithContext;
};

type ModalButtonProps = {
  children: ChildrenWithContext;
};

type ModalContentProps = {
  children: ModalContentChildren;
};

type ModalHeaderProps = PropsWithChildren & {
  showSubmitButton?: boolean;
  handleSubmit?(): void;
};

type ModalChildren = [ReactElement<ModalButtonProps>, ReactElement<ModalContentProps>];

type ModalContentChildren =
  | [ReactElement<ModalHeaderProps>, ReactElement<ModalBodyProps>]
  | ReactElement<ModalBodyProps>;

export type {
  ModalBodyProps,
  ModalButtonProps,
  ModalChildren,
  ModalContentChildren,
  ModalContentProps,
  ModalContextType,
  ModalHeaderProps,
  ModalProps,
};
