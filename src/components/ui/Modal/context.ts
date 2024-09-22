import { createContext, SyntheticEvent } from 'react';

import type { ModalContextType } from '@/types/modal';

const initialValue: ModalContextType = {
  isOpen: false,
  isFormValid: false,
  handleFormValidation: () => {
    console.log('Modal form validation function not implemented');
  },
  handleOpen: (callback?: (e: SyntheticEvent) => Promise<void>) => {
    return async (e: SyntheticEvent) => {
      console.log('Modal open function not implemented');
      await callback?.(e);
      return e;
    };
  },
  handleClose: (callback?: (e: SyntheticEvent) => Promise<void>) => {
    return async (e: SyntheticEvent) => {
      console.log('Modal close function not implemented');
      await callback?.(e);
      return e;
    };
  },
};

export const ModalContext = createContext<ModalContextType>(initialValue);
