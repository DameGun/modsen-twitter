import { Helmet } from 'react-helmet-async';
import { NavLink, useLocation, useParams } from 'react-router-dom';

import { parseUserName } from '@/entities/user';
import { DocumentTitle } from '@/shared/constants/documentTitle';
import { Routes } from '@/shared/constants/routes';
import { ConnectionType } from '@/shared/constants/user';
import type { ConnectionsPageParams, PageWithUserStateLocation } from '@/shared/types/router';
import { SectionHeader } from '@/shared/ui/SectionHeader';
import { StickyContainer } from '@/shared/ui/StickyContainer';
import { Tab, Tabs } from '@/shared/ui/Tabs';
import { Heading4 } from '@/shared/ui/Text';
import { ConnectionsList } from '@/widgets/user';

export function ConnectionsPage() {
  const { connectionType, userName } = useParams<ConnectionsPageParams>();
  const { state } = useLocation() as PageWithUserStateLocation;

  return (
    <>
      <Helmet>
        <title>{DocumentTitle[connectionType!](userName!)}</title>
      </Helmet>
      <StickyContainer $direction='column'>
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
      </StickyContainer>
      <ConnectionsList userName={userName!} connectionType={connectionType!} />
    </>
  );
}
