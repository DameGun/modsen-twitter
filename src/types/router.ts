import type { Location } from 'react-router-dom';

import { ConnectionType } from '@/constants/user';

import type { UserDoc } from './user';

type SubscriptionPageParams = {
  userName: string;
  connectionType: ConnectionType;
};

type PageWithUserStateLocation = Location<UserDoc | undefined>;

export type { PageWithUserStateLocation, SubscriptionPageParams };
