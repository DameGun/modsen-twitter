import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getUserByUserName, NotFound, selectCurrentUser } from '@/entities/user';
import type { UserDoc } from '@/entities/user/types';
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
  const [displayedUser, setDisplayedUser] = useState<UserDoc | undefined>(
    isCurrentUser ? currentAuthenticatedUser : undefined
  );
  useModifyDocumentTitle(userName!);

  const { isLoading } = useAsyncWithLoading({
    call: getUserByUserName,
    args: userName,
    handleLoading,
    loadInitially: !isCurrentUser,
    handleResult: setDisplayedUser,
    triggerVariable: currentAuthenticatedUser,
  });

  useEffect(() => {
    if (isCurrentUser && displayedUser !== currentAuthenticatedUser) {
      setDisplayedUser(currentAuthenticatedUser);
    }
  }, [userName]);

  if (displayedUser) return <UserProfile user={displayedUser} isCurrentUser={isCurrentUser} />;

  if (!isLoading && !displayedUser) return <NotFound userName={userName!} />;
}

export const ProfilePage = withLoader(BaseProfilePage);
