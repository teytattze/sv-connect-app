import { join } from 'path';

export const getAbsolutePath = (path: string): string => {
  if (path.startsWith('/') || path.startsWith('./') || path.startsWith('../')) {
    return join(process.cwd(), path);
  }
  return path;
};
