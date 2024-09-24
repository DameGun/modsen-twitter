import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { VisibilityIcon, VisibilityOffIcon } from '@/shared/assets/icons';
import type { FormatStyledProps } from '@/shared/types/styles';

import {
  ControlStylesProps,
  LengthConstraint,
  StyledInput,
  StyledInputLabel,
  StyledInputWrapper,
  VisibilityOption,
} from './styled';

type CustomInputProps = FormatStyledProps<ControlStylesProps> &
  InputHTMLAttributes<HTMLInputElement> & {
    asTextArea?: boolean;
    autoResize?: boolean;
  };

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(function CustomInput(
  {
    placeholder,
    isInvalid,
    onChange,
    maxLength,
    type,
    defaultValue,
    asTextArea,
    autoResize,
    variant,
    ...rest
  }: CustomInputProps,
  ref
) {
  const [currentLength, setCurrentLength] = useState(defaultValue?.toString().length ?? 0);
  const [inputType, setInputType] = useState(type);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentLength(e.target.value.length);
    onChange?.(e);
  };

  const handleFocus = () => inputRef.current && inputRef.current.focus();

  const handleShowPassword = () => {
    if (showPassword) {
      setInputType('password');
      setShowPassword(false);
    } else {
      setInputType('text');
      setShowPassword(true);
    }
  };

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, []);

  useEffect(() => {
    if (autoResize && inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
  }, [inputRef, currentLength]);

  return (
    <StyledInputWrapper $isInvalid={isInvalid} $variant={variant} onClick={handleFocus}>
      <LengthConstraint>{maxLength && `${currentLength} / ${maxLength}`}</LengthConstraint>
      <StyledInput
        as={asTextArea ? 'textarea' : 'input'}
        ref={inputRef}
        type={inputType}
        placeholder=' '
        maxLength={maxLength}
        defaultValue={defaultValue}
        {...rest}
        onChange={handleChange}
      />
      <StyledInputLabel $variant={variant} htmlFor={rest.name}>
        {placeholder}
      </StyledInputLabel>
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
