import { getUserConnections } from '@/entities/user';
import { UserCell } from '@/features/user';
import { FallbackTextMain, FallbackTextSecondary } from '@/shared/constants/fallback';
import { ConnectionType } from '@/shared/constants/user';
import { reverseMapType } from '@/shared/lib/mappings';
import { useAsyncWithLoading } from '@/shared/lib/useAsyncWithLoading';
import { withLoader } from '@/shared/lib/withLoader';
import type { ManualLoadingHandleProps } from '@/shared/types/loader';
import { Fallback } from '@/shared/ui';

type ConnectionsListProps = ManualLoadingHandleProps & {
  connectionType: ConnectionType;
  userName: string;
};

function BaseConnectionsList({ connectionType, userName, handleLoading }: ConnectionsListProps) {
  const { data, isLoading } = useAsyncWithLoading({
    call: getUserConnections,
    args: { userName, connectionType },
    loadInitially: true,
    handleLoading,
  });

  if (data && data.length > 0) return data.map((user) => <UserCell key={user.uid} user={user} />);

  if (!data && !isLoading) {
    return <Fallback mainText={FallbackTextMain.Main} secondaryText={FallbackTextSecondary.Main} />;
  }

  if (data && !isLoading) {
    return (
      <Fallback
        mainText={reverseMapType(connectionType, FallbackTextMain)}
        secondaryText={reverseMapType(connectionType, FallbackTextSecondary)}
      />
    );
  }
}

export const ConnectionsList = withLoader(BaseConnectionsList);
