import React from 'react';

import Home from '@mui/icons-material/Home';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import TabletMacIcon from '@mui/icons-material/TabletMac';
import UsbIcon from '@mui/icons-material/Usb';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PeopleIcon from '@mui/icons-material/People';

export interface LinkType {
  text: string;
  link?: string;
  icon?: React.ReactElement;
  sublinks?: LinkType[];
  highlightLinks: string[];
  readModel?: string;
  // TODO: add a list
}

const links: LinkType[] = [
  {
    link: 'dashboard',
    text: 'Dashboard',
    icon: <Home />,
    highlightLinks: ['dashboard'],
  },
  {
    text: 'Devices',
    icon: <DesktopMacIcon />,
    sublinks: [
      {
        link: 'devices',
        text: 'All Devices',
        highlightLinks: ['new-device', 'device', 'devices'],
        readModel: 'device',
      },
      {
        link: 'devices-profiles',
        text: 'Devices Profiles',
        highlightLinks: [
          'new-device-profile',
          'device-profile',
          'devices-profiles',
        ],
        readModel: 'device_type',
      },
    ],
    highlightLinks: [
      'devices',
      'new-device',
      'device',
      'devices-profiles',
      'new-device-profile',
      'device-profile',
    ],
  },
  {
    text: 'Software',
    icon: <TabletMacIcon />,
    sublinks: [
      {
        link: 'commands',
        text: 'Commands',
        highlightLinks: ['new-command', 'command'],
        readModel: 'command',
      },
      {
        link: 'software-updates',
        text: 'Software Packages',
        highlightLinks: ['new-software-update', 'software-update'],
        readModel: 'software-update',
      },
    ],
    highlightLinks: [
      'commands',
      'new-command',
      'command',
      'software-updates',
      'new-software-update',
      'software-update',
    ],
  },
  {
    text: 'Data management',
    icon: <UsbIcon />,
    sublinks: [
      {
        link: 'data-management',
        text: 'Consume Data',
        highlightLinks: ['data-management'],
      },
      {
        link: 'policies',
        text: 'Policies',
        highlightLinks: ['new-policy', 'policy', 'policies'],
        readModel: 'rule',
      },
    ],
    highlightLinks: [
      'data-management',
      ...['new-ingestor', 'ingestor', 'ingestors'],
      ...['new-translator', 'translator', 'translators'],
      ...['new-integration', 'integration', 'integrations'],
      ...['new-policy', 'policy', 'policies'],
    ],
  },
  {
    link: 'analytics',
    text: 'Analytics',
    icon: <BarChartIcon />,
    highlightLinks: ['analytics'],
  },
  {
    link: 'automation',
    text: 'Automation',
    icon: <AccountTreeIcon />,
    highlightLinks: ['automation'],
  },
  {
    text: 'Account',
    icon: <PeopleIcon />,
    sublinks: [
      {
        link: 'accounts',
        text: 'Accounts',
        highlightLinks: ['new-account', 'account'],
        readModel: 'company',
      },
      {
        link: 'users',
        text: 'Users',
        highlightLinks: ['new-user', 'user'],
        readModel: 'user',
      },
      {
        link: 'secrets',
        text: 'Secrets',
        highlightLinks: ['new-secret', 'secret'],
      },
      {
        link: 'regions',
        text: 'Regions',
        highlightLinks: ['new-region', 'region'],
        readModel: 'region',
      },
    ],
    highlightLinks: [
      'accounts',
      'new-account',
      'account',
      'users',
      'new-user',
      'user',
      'secrets',
      'new-secret',
      'secret',
      'regions',
      'new-region',
      'region',
    ],
  },
];

export default links;
