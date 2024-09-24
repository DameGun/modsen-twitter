import styled from 'styled-components';

import { FlexContainer } from '@/shared/ui';

import { SEARCH_WINDOW_MAX_HEIGHT, SEARCH_WINDOW_MIN_HEIGHT } from '../../constants';

export const SearchListWrapper = styled(FlexContainer)`
  background-color: ${(props) => props.theme.colors.main};
  border: ${(props) => props.theme.variables.borderWidth.sm} solid;
  border-radius: ${(props) => props.theme.variables.borderRadius.md};
  border-color: ${(props) => props.theme.colors.secondary};
  overflow: hidden;
  position: absolute;
  top: 100%;
  margin-top: ${(props) => props.theme.variables.spacing.sm};
  width: 100%;
  scrollbar-gutter: unset;
  max-height: ${SEARCH_WINDOW_MAX_HEIGHT};
  min-height: ${SEARCH_WINDOW_MIN_HEIGHT};
`;

export const SearchListInnerWrapper = styled(FlexContainer)`
  height: 100%;
  overflow-y: auto;
  scrollbar-gutter: unset;
`;

export const InfoTextWrapper = styled.span`
  padding: ${(props) => props.theme.variables.spacing.md};
  text-align: center;
  justify-self: center;
`;

export const NotFoundWrapper = styled.div`
  padding: ${(props) => props.theme.variables.spacing.md};
  text-align: center;
`;
