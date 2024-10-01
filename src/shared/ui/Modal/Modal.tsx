import { Fragment, SyntheticEvent, useCallback, useMemo, useState } from 'react';

import type { ModalProps } from '@/shared/types/modal';

import { ModalContext } from './context';

export function Modal({ children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleOpen = useCallback((callback?: (e: SyntheticEvent) => Promise<void>) => {
    return async (e: SyntheticEvent) => {
      e.stopPropagation();
      e.preventDefault();
      await callback?.(e);
      setIsOpen(true);
      return e;
    };
  }, []);

  const handleClose = useCallback((callback?: (e: SyntheticEvent) => Promise<void>) => {
    return async (e: SyntheticEvent) => {
      e.stopPropagation();
      e.preventDefault();
      await callback?.(e);
      setIsOpen(false);
      return e;
    };
  }, []);

  const handleFormValidation = useCallback((isValid: boolean) => setIsFormValid(isValid), []);

  const contextValue = useMemo(
    () => ({ isOpen, isFormValid, handleClose, handleOpen, handleFormValidation }),
    [isOpen, isFormValid]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children.map((child, index) => (
        <Fragment key={index}>{child}</Fragment>
      ))}
    </ModalContext.Provider>
  );
}
