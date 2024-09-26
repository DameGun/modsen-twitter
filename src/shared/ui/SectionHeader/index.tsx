import { useNavigate } from 'react-router-dom';

import { ArrowBackIcon } from '@/shared/assets/icons';
import { PropsWithChildren } from '@/shared/types/common';

import { StyledSectionHeader } from './styled';

import { StyledButton } from '../StyledButton';
import { StyledIcon } from '../StyledIcon';
import { Heading3 } from '../Text';

type SectionHeaderProps = PropsWithChildren & {
  isNavigatable?: boolean;
  headerText?: string;
};

export function SectionHeader({ isNavigatable, headerText, children }: SectionHeaderProps) {
  const navigate = useNavigate();

  const handlePreviousPageClick = () => navigate(-1);

  return (
    <StyledSectionHeader $align='center' $gap='md'>
      {isNavigatable && (
        <StyledButton $variant='icon' onClick={handlePreviousPageClick}>
          <StyledIcon $size='sm'>
            <ArrowBackIcon title='Go back' />
          </StyledIcon>
        </StyledButton>
      )}
      {headerText && <Heading3>{headerText}</Heading3>}
      {children}
    </StyledSectionHeader>
  );
}
