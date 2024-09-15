import styled from 'styled-components';

import { FlexContainer } from '@/components/ui';

export const ProfileErrorWrapper = styled(FlexContainer)`
  padding: ${(props) => props.theme.variables.spacing.lg}
    ${(props) => props.theme.variables.spacing.lg};
`;
