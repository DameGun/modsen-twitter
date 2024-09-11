import { ChangeEvent, forwardRef, InputHTMLAttributes, useState } from 'react';

import { VisibilityIcon, VisibilityOffIcon } from '@/assets/icons';
import type { FormatStyledProps } from '@/types/styles';

import {
  ControlStylesProps,
  LengthConstraint,
  StyledInput,
  StyledInputLabel,
  StyledInputWrapper,
  VisibilityOption,
} from './styled';

type CustomInputProps = FormatStyledProps<ControlStylesProps> &
  InputHTMLAttributes<HTMLInputElement>;

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(function CustomInput(
  { placeholder, isInvalid, onChange, maxLength, type, ...rest }: CustomInputProps,
  ref
) {
  const [currentLength, setCurrentLength] = useState(0);
  const [inputType, setInputType] = useState(type);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentLength(e.target.value.length);
    onChange?.(e);
  };

  const handleShowPassword = () => {
    if (showPassword) {
      setInputType('password');
      setShowPassword(false);
    } else {
      setInputType('text');
      setShowPassword(true);
    }
  };

  return (
    <StyledInputWrapper>
      <StyledInput
        ref={ref}
        type={inputType}
        placeholder=' '
        $isInvalid={isInvalid}
        maxLength={maxLength}
        {...rest}
        onChange={handleChange}
      />
      <StyledInputLabel $isInvalid={isInvalid} htmlFor={rest.name}>
        {placeholder}
      </StyledInputLabel>
      {maxLength && (
        <LengthConstraint $isInvalid={isInvalid}>
          {currentLength} / {maxLength}
        </LengthConstraint>
      )}
      {type === 'password' && (
        <VisibilityOption
          $size='sm'
          $isInvalid={isInvalid}
          $notInvertColor
          onClick={handleShowPassword}
        >
          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </VisibilityOption>
      )}
    </StyledInputWrapper>
  );
});
