import styled from 'styled-components';

import type { ColorsConstants, FontConstants } from '@/types/styles';

interface TextProps {
  color?: Exclude<keyof ColorsConstants, 'buttonHover'>;
  size?: keyof FontConstants['size'];
  weight?: keyof FontConstants['weight'];
}

export const Heading1 = styled.h1<TextProps>`
  font-size: ${({ theme, size = 'xl3' }) => theme.font.size[size]};
  font-weight: ${({ weight = 'bold', theme }) => theme.font.weight[weight]};
  color: ${({ theme, color = 'textMain' }) => theme.colors[color]};
`;

export const Heading2 = styled.h2<TextProps>`
  font-size: ${({ theme, size = 'xl2' }) => theme.font.size[size]};
  font-weight: ${({ weight = 'bold', theme }) => theme.font.weight[weight]};
  color: ${({ theme, color = 'textMain' }) => theme.colors[color]};
`;

export const Heading3 = styled.h3<TextProps>`
  font-size: ${({ theme, size = 'xl' }) => theme.font.size[size]};
  font-weight: ${({ weight = 'bold', theme }) => theme.font.weight[weight]};
  color: ${({ theme, color = 'textMain' }) => theme.colors[color]};
`;

export const Heading4 = styled.h4<TextProps>`
  font-size: ${({ theme, size = 'md' }) => theme.font.size[size]};
  font-weight: ${({ weight = 'semibold', theme }) => theme.font.weight[weight]};
  color: ${({ theme, color = 'textMain' }) => theme.colors[color]};
`;

export const Paragraph = styled.p<TextProps>`
  font-size: ${({ theme, size = 'md' }) => theme.font.size[size]};
  font-weight: ${({ weight = 'regular', theme }) => theme.font.weight[weight]};
  color: ${({ theme, color = 'textMain' }) => theme.colors[color]};
`;

export const StyledListItem = styled.li<Pick<TextProps, 'color'>>`
  color: ${({ theme, color = 'textMain' }) => theme.colors[color]};
`;
