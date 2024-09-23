import { NavLink, useLocation, useParams } from 'react-router-dom';

import { parseUserName } from '@/entities/user';
import { Routes } from '@/shared/constants/routes';
import { ConnectionType } from '@/shared/constants/user';
import type { ConnectionsPageParams, PageWithUserStateLocation } from '@/shared/types/router';
import { Heading4, SectionHeader, Tab, Tabs } from '@/shared/ui';
import { ConnectionsList } from '@/widgets/user';

export function ConnectionsPage() {
  const { connectionType, userName } = useParams<ConnectionsPageParams>();
  const { state } = useLocation() as PageWithUserStateLocation;

  return (
    <>
      <SectionHeader
        isNavigatable
        headerText={state && state.fullName ? state.fullName : parseUserName(userName!)}
      />
      <Tabs>
        <NavLink
          to={Routes.Connections(userName!, ConnectionType.Followers.toLowerCase())}
          state={state}
        >
          {({ isActive }) => (
            <Tab $isActive={isActive}>
              <Heading4>Followers</Heading4>
            </Tab>
          )}
        </NavLink>
        <NavLink
          to={Routes.Connections(userName!, ConnectionType.Following.toLowerCase())}
          state={state}
        >
          {({ isActive }) => (
            <Tab $isActive={isActive}>
              <Heading4>Following</Heading4>
            </Tab>
          )}
        </NavLink>
      </Tabs>
      <ConnectionsList userName={userName!} connectionType={connectionType!} />
    </>
  );
}
