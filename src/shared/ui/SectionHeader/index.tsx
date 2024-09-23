import { useNavigate } from 'react-router-dom';

import { ArrowBackIcon } from '@/shared/assets/icons';

import { StyledSectionHeader } from './styled';

import { StyledButton } from '../StyledButton';
import { StyledIcon } from '../StyledIcon';
import { Heading3 } from '../Text';

type SectionHeaderProps = {
  isNavigatable?: boolean;
  headerText: string;
};

export function SectionHeader({ isNavigatable, headerText }: SectionHeaderProps) {
  const navigate = useNavigate();

  const handlePreviousPageClick = () => navigate(-1);

  return (
    <StyledSectionHeader $align='center' $gap='md'>
      {isNavigatable && (
        <StyledButton variant='icon' onClick={handlePreviousPageClick}>
          <StyledIcon $size='sm'>
            <ArrowBackIcon />
          </StyledIcon>
        </StyledButton>
      )}
      <Heading3>{headerText}</Heading3>
    </StyledSectionHeader>
  );
}
