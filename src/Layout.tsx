import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { DEFAULT_ROUTE } from './lib/constants';
import { Box } from '@mui/system';

export default function Layout() {
  const nagivate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      nagivate(DEFAULT_ROUTE);
    }
  }, [location.pathname, nagivate]);

  return (
    <Box
      sx={{
        padding: 2,
      }}
    >
      <main>
        <Outlet />
      </main>
    </Box>
  );
}
