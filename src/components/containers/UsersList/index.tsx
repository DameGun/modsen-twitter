import { NotFoundFallback } from '@/components/common';
import { NotFoundTextMain, NotFoundTextSecondary } from '@/constants/notFound';
import { ConnectionType } from '@/constants/user';
import { useAsyncWithLoading } from '@/hooks/useAsyncWithLoading';
import { UsersRepositoryService } from '@/services/firestore/users';
import type { ManualLoadingHandleProps } from '@/types/loader';
import { reverseMapConnectionType } from '@/utils/user';
import { withLoader } from '@/utils/withLoader';

import { UserCell } from '../UserCell';

type UsersListProps = ManualLoadingHandleProps & {
  connectionType: ConnectionType;
  userName: string;
};

function BaseUsersList({ connectionType, userName, handleLoading }: UsersListProps) {
  const { data, isLoading } = useAsyncWithLoading({
    call: UsersRepositoryService.getUserConnections,
    args: { userName, connectionType },
    loadInitially: true,
    handleLoading,
  });

  if (data && data.length > 0) return data.map((user) => <UserCell key={user.uid} user={user} />);

  if (!data && !isLoading) {
    return (
      <NotFoundFallback
        mainText={NotFoundTextMain.Main}
        secondaryText={NotFoundTextSecondary.Main}
      />
    );
  }

  if (data && !isLoading) {
    return (
      <NotFoundFallback
        mainText={NotFoundTextMain[reverseMapConnectionType(connectionType)]}
        secondaryText={NotFoundTextSecondary[reverseMapConnectionType(connectionType)]}
      />
    );
  }
}

export const UsersList = withLoader(BaseUsersList);
