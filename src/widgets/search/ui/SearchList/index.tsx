import { memo, useMemo } from 'react';

import { UserCell } from '@/entities/user';
import { Loader, Paragraph } from '@/shared/ui';

import {
  InfoTextWrapper,
  NotFoundWrapper,
  SearchListInnerWrapper,
  SearchListWrapper,
} from './styled';

import { useGetUsersBySearchTermQuery } from '../../api/getUsersBySearchTerm';

type SearchListProps = {
  queryValue: string;
  handleClear: VoidFunction;
};

export const SearchList = memo(function SearchListMemoized({
  queryValue,
  handleClear,
}: SearchListProps) {
  const { data, isFetching } = useGetUsersBySearchTermQuery(queryValue, { skip: !queryValue });

  const Content = useMemo(() => {
    if (isFetching) {
      return <Loader isLoading />;
    }

    if (!queryValue) {
      return (
        <InfoTextWrapper>
          <Paragraph $color='textSecondary'>Try searching for people or tweets</Paragraph>
        </InfoTextWrapper>
      );
    }

    if (data && data.length > 0) {
      return (
        <SearchListInnerWrapper $direction='column'>
          {data.map((user) => (
            <span key={user.uid} onClick={handleClear}>
              <UserCell user={user} variant='short' />
            </span>
          ))}
        </SearchListInnerWrapper>
      );
    }

    return (
      <NotFoundWrapper>
        <Paragraph $color='textSecondary'>No result found for: &quot;{queryValue}&quot;</Paragraph>
      </NotFoundWrapper>
    );
  }, [queryValue, data, isFetching]);

  return <SearchListWrapper $direction='column'>{Content}</SearchListWrapper>;
});
