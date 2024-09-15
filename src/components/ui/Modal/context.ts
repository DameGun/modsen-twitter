import { createContext } from 'react';

import type { ModalContextType } from '@/types/modal';

const initialValue: ModalContextType = {
  isOpen: false,
  isFormValid: false,
  handleFormValidation: () => {
    console.log('Modal form validation function not implemented');
  },
  handleOpen: () => {
    console.log('Modal open function not implemented');
  },
  handleClose: () => {
    console.log('Modal close function not implemented');
  },
};

export const ModalContext = createContext<ModalContextType>(initialValue);
