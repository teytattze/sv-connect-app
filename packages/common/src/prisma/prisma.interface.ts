export interface IPrismaModuleOptions {
  type: string;
  host: string;
  port: string | number;
  username: string;
  password: string;
  database: string;
  property?: string;
}
