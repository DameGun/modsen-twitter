import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ProfileNotFound, UserProfile } from '@/components/containers';
import { useAppSelector } from '@/hooks/store';
import { useAsyncWithLoading } from '@/hooks/useAsyncWithLoading';
import { UsersRepositoryService } from '@/services/firestore/users';
import { selectCurrentUser } from '@/services/store/user';
import type { ManualLoadingHandleProps } from '@/types/loader';
import type { UserDoc } from '@/types/user';
import { withLoader } from '@/utils/withLoader';

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

  const { isLoading } = useAsyncWithLoading({
    call: UsersRepositoryService.getUserByUserName,
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

  if (!isLoading && !displayedUser) return <ProfileNotFound userName={userName!} />;
}

export const ProfilePage = withLoader(BaseProfilePage);
