import { ReactNode } from 'react';

import { FormFieldWrapper } from './styled';

import { Paragraph } from '../Text';

interface FormFieldProps {
  children: ReactNode;
  errorText?: string;
}

export function FormField({ children, errorText }: FormFieldProps) {
  return (
    <FormFieldWrapper>
      {children}
      <Paragraph color='error'>{errorText}</Paragraph>
    </FormFieldWrapper>
  );
}
