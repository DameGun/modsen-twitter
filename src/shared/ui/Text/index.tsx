import styled from 'styled-components';

import type { ColorsConstants, FontConstants } from '@/shared/types/styles';

type TextProps = {
  color?: keyof ColorsConstants;
  size?: keyof FontConstants['size'];
  weight?: keyof FontConstants['weight'];
};

export const Heading1 = styled.h1<TextProps>`
  font-size: ${({ theme, size = 'xl3' }) => theme.font.size[size]};
  font-weight: ${({ weight = 'bold', theme }) => theme.font.weight[weight]};
  color: ${({ theme, color = 'textMain' }) => theme.colors[color]};

  @media ${(props) => props.theme.media.mobile} {
    font-size: ${(props) => props.theme.font.size.xl2};
  }
`;

export const Heading2 = styled.h2<TextProps>`
  font-size: ${({ theme, size = 'xl2' }) => theme.font.size[size]};
  font-weight: ${({ weight = 'bold', theme }) => theme.font.weight[weight]};
  color: ${({ theme, color = 'textMain' }) => theme.colors[color]};

  @media ${(props) => props.theme.media.mobile} {
    font-size: ${(props) => props.theme.font.size.xl};
  }
`;

export const Heading3 = styled.h3<TextProps>`
  font-size: ${({ theme, size = 'xl' }) => theme.font.size[size]};
  font-weight: ${({ weight = 'bold', theme }) => theme.font.weight[weight]};
  color: ${({ theme, color = 'textMain' }) => theme.colors[color]};

  @media ${(props) => props.theme.media.mobile} {
    font-size: ${(props) => props.theme.font.size.lg};
  }
`;

export const Heading4 = styled.h4<TextProps>`
  font-size: ${({ theme, size = 'md' }) => theme.font.size[size]};
  font-weight: ${({ weight = 'semibold', theme }) => theme.font.weight[weight]};
  color: ${({ theme, color = 'textMain' }) => theme.colors[color]};

  @media ${(props) => props.theme.media.mobile} {
    font-size: ${(props) => props.theme.font.size.sm};
  }
`;

export const Paragraph = styled.p<TextProps>`
  font-size: ${({ theme, size = 'md' }) => theme.font.size[size]};
  font-weight: ${({ weight = 'regular', theme }) => theme.font.weight[weight]};
  color: ${({ theme, color = 'textMain' }) => theme.colors[color]};

  @media ${(props) => props.theme.media.mobile} {
    font-size: ${(props) => props.theme.font.size.sm};
  }
`;

export const StyledListItem = styled.li<Pick<TextProps, 'color'>>`
  color: ${({ theme, color = 'textMain' }) => theme.colors[color]};
`;
