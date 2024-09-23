import { ReactNode } from 'react';

import { FlexContainer } from '../FlexContainer';
import { Paragraph } from '../Text';

type FormFieldProps = {
  children: ReactNode;
  errorText?: string;
};

export function FormField({ children, errorText }: FormFieldProps) {
  return (
    <FlexContainer $direction='column' $justify='space-between' $gap='sm'>
      {children}
      <Paragraph color='error'>{errorText}</Paragraph>
    </FlexContainer>
  );
}
