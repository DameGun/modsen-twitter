import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { getUserByUserName, NotFound, selectCurrentUser } from '@/entities/user';
import { DocumentTitle } from '@/shared/constants/documentTitle';
import { useAppSelector } from '@/shared/lib/store';
import { useAsyncWithLoading } from '@/shared/lib/useAsyncWithLoading';
import { withLoader } from '@/shared/lib/withLoader';
import type { ManualLoadingHandleProps } from '@/shared/types/loader';
import { UserProfile } from '@/widgets/user';

function BaseProfilePage({ handleLoading }: ManualLoadingHandleProps) {
  const currentAuthenticatedUser = useAppSelector(selectCurrentUser);
  const { userName } = useParams();
  const isCurrentUser = useMemo(
    () => userName === currentAuthenticatedUser.userName,
    [currentAuthenticatedUser, userName]
  );

  const { data, isLoading } = useAsyncWithLoading({
    call: getUserByUserName,
    args: userName,
    handleLoading,
    loadInitially: !isCurrentUser,
    triggerVariable: userName,
  });

  if (data || isCurrentUser) {
    return (
      <>
        <Helmet>
          <title>{DocumentTitle.Profile(userName!)}</title>
        </Helmet>
        <UserProfile
          user={data && !isCurrentUser ? data : currentAuthenticatedUser}
          isCurrentUser={isCurrentUser}
        />
      </>
    );
  }

  if (!isLoading && !data) return <NotFound userName={userName!} />;
}

export const ProfilePage = withLoader(BaseProfilePage);
