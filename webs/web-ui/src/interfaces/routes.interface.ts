import { AccountRole } from '@sv-connect/domain';

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
