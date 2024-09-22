import { NavLink, useLocation, useParams } from 'react-router-dom';

import { UsersList } from '@/components/containers';
import { Heading4, SectionHeader, Tab, Tabs } from '@/components/ui';
import { Routes } from '@/constants/routes';
import { ConnectionType } from '@/constants/user';
import type { PageWithUserStateLocation, SubscriptionPageParams } from '@/types/router';
import { parseUserName } from '@/utils/user';

export function SubscriptionsPage() {
  const { connectionType, userName } = useParams<SubscriptionPageParams>();
  const { state } = useLocation() as PageWithUserStateLocation;

  return (
    <>
      <SectionHeader
        isNavigatable
        headerText={state && state.fullName ? state.fullName : parseUserName(userName!)}
      />
      <Tabs>
        <NavLink
          to={Routes.Subscriptions(userName!, ConnectionType.Followers.toLowerCase())}
          state={state}
        >
          {({ isActive }) => (
            <Tab $isActive={isActive}>
              <Heading4>Followers</Heading4>
            </Tab>
          )}
        </NavLink>
        <NavLink
          to={Routes.Subscriptions(userName!, ConnectionType.Following.toLowerCase())}
          state={state}
        >
          {({ isActive }) => (
            <Tab $isActive={isActive}>
              <Heading4>Following</Heading4>
            </Tab>
          )}
        </NavLink>
      </Tabs>
      <UsersList userName={userName!} connectionType={connectionType!} />
    </>
  );
}
