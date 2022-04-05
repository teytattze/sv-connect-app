import { Typography } from '@mui/material';

export interface FormTitleProps {
  title: string;
}

export function FormTitle({ title }: FormTitleProps) {
  return (
    <Typography
      variant="h4"
      sx={{
        fontWeight: 'bold',
        borderLeft: '5px solid',
        borderColor: 'primary.main',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        px: 2,
      }}
    >
      {title}
    </Typography>
  );
}
