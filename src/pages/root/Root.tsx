import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';
import { Outlet } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import Head from '../../components/Head';
import Notify from '../../components/Notify';

export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200 }}>
          <SideBar/>
        </Navbar>
      }

      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Head/>
          </div>
        </Header>
      }
    >
      <Outlet/>
      <Notify/>
    </AppShell>
  );
}
