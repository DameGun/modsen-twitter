import styled from 'styled-components';

export const FormFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${(props) => props.theme.variables.spacing.sm};
`;
