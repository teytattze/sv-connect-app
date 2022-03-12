import * as React from 'react';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import SummarizeRoundedIcon from '@mui/icons-material/SummarizeRounded';
import SupervisorAccountRoundedIcon from '@mui/icons-material/SupervisorAccountRounded';
import { AccountRole } from '../shared/constants/accounts.const';

export interface IRoute {
  group: string;
  paths: IPath[];
  roles: AccountRole[];
}

export interface IPath {
  name: string;
  path: string;
  roles: AccountRole[];
  Icon: React.ReactNode;
}

export const routes: IRoute[] = [
  {
    group: 'Overview',
    roles: [],
    paths: [
      {
        name: 'Profile',
        path: '/profile',
        roles: [],
        Icon: <AccountBoxRoundedIcon />,
      },
      {
        name: 'Project',
        path: '/project',
        roles: [],
        Icon: <AssignmentRoundedIcon />,
      },
      {
        name: 'Setting',
        path: '/setting',
        roles: [],
        Icon: <ManageAccountsRoundedIcon />,
      },
    ],
  },
  {
    group: 'Account',
    roles: [],
    paths: [
      {
        name: 'Student',
        path: '/students',
        roles: [],
        Icon: <AssignmentIndRoundedIcon />,
      },
      {
        name: 'Supervisor',
        path: '/supervisors',
        roles: [],
        Icon: <SupervisorAccountRoundedIcon />,
      },
    ],
  },
  {
    group: 'Administration',
    roles: [],
    paths: [
      {
        name: 'Auto Matching',
        path: '/auto-matching',
        roles: [],
        Icon: <AutoAwesomeRoundedIcon />,
      },
      {
        name: 'Summary',
        path: '/summary',
        roles: [],
        Icon: <SummarizeRoundedIcon />,
      },
    ],
  },
];
