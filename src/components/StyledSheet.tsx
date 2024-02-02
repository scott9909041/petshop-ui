import { Sheet } from '@mui/joy';
import { SxProps } from '@mui/joy/styles/types';
import { ReactNode } from 'react';

interface StyledSheet {
  sx?: SxProps;
  children?: ReactNode;
}

const StyledSheet = ({ sx, children }: StyledSheet) => {
  return (
    <Sheet
      sx={{
        width: 400,
        mx: 'auto',
        my: 4,
        py: 3,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 'sm',
        boxShadow: 'md',
        ...sx,
      }}
      variant='outlined'
    >
      {children}
    </Sheet>
  );
};

export default StyledSheet;
