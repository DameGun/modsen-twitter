import { ReactElement, ReactNode } from 'react';

type ModalContextType = {
  isOpen: boolean;
  isFormValid: boolean;
  handleFormValidation(isValid: boolean): void;
  handleOpen: VoidFunction;
  handleClose(): void;
};

type ModalProps = {
  children: ModalChildren;
};

type ModalBodyProps = {
  children: ReactNode;
};

type ModalButtonProps = {
  children(context: ModalContextType): ReactNode;
};

type ModalContentProps = {
  children: ModalContentChildren;
};

type ModalHeaderProps = {
  showSubmitButton?: boolean;
  handleSubmit?(): void;
  children?: ReactNode;
};

type ModalChildren = [ReactElement<ModalButtonProps>, ReactElement<ModalContentProps>];

type ModalContentChildren = [ReactElement<ModalHeaderProps>, ReactElement<ModalBodyProps>];

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
