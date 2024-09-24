import { useCallback, useMemo, useState } from 'react';

import type { ModalProps } from '@/types/modal';

import { ModalContext } from './context';

export function Modal({ children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleOpen = useCallback(() => setIsOpen(true), []);

  const handleClose = useCallback(() => setIsOpen(false), []);

  const handleFormValidation = useCallback((isValid: boolean) => setIsFormValid(isValid), []);

  const contextValue = useMemo(
    () => ({ isOpen, isFormValid, handleClose, handleOpen, handleFormValidation }),
    [isOpen, isFormValid]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children.map((child) => child)}
    </ModalContext.Provider>
  );
}
