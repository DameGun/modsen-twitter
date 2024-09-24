import type { Location } from 'react-router-dom';

import type { UserDoc } from '@/entities/user/types';
import { ConnectionType } from '@/shared/constants/user';

type ConnectionsPageParams = {
  userName: string;
  connectionType: ConnectionType;
};

type PageWithUserStateLocation = Location<UserDoc | undefined>;

export type { ConnectionsPageParams, PageWithUserStateLocation };
