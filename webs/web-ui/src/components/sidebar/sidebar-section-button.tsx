import { IconButton, ListItemButton, ListItemText, Stack } from '@mui/material';
import { IPath } from '../../interfaces/routes.interface';

export interface SidebarSectionButtonProps {
  path: IPath;
}

export function SidebarSectionButton({ path }: SidebarSectionButtonProps) {
  return (
    <ListItemButton
      sx={{
        borderRadius: 1,
        p: 0,
      }}
    >
      <Stack
        sx={{
          p: 1,
          mr: 1,
        }}
      >
        {path.Icon}
      </Stack>
      <ListItemText primary={path.name} />
    </ListItemButton>
  );
}

export function SidebarSectionButtonMinimize({
  path,
}: SidebarSectionButtonProps) {
  return <IconButton>{path.Icon}</IconButton>;
}
