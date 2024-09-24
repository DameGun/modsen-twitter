import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { getUserByUserName, NotFound, selectCurrentUser } from '@/entities/user';
import { useAppSelector } from '@/shared/lib/store';
import { useAsyncWithLoading } from '@/shared/lib/useAsyncWithLoading';
import { useModifyDocumentTitle } from '@/shared/lib/useModifyDocumentTitle';
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
  useModifyDocumentTitle(userName!);

  const { data, isLoading } = useAsyncWithLoading({
    call: getUserByUserName,
    args: userName,
    handleLoading,
    loadInitially: !isCurrentUser,
    triggerVariable: userName,
  });

  if (data || isCurrentUser) {
    return (
      <UserProfile
        user={data && !isCurrentUser ? data : currentAuthenticatedUser}
        isCurrentUser={isCurrentUser}
      />
    );
  }

  if (!isLoading && !data) return <NotFound userName={userName!} />;
}

export const ProfilePage = withLoader(BaseProfilePage);
