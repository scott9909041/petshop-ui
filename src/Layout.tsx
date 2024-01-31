import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { DEFAULT_ROUTE } from './lib/constants';

export default function Layout() {
  const nagivate = useNavigate();

  useEffect(() => {
    nagivate(DEFAULT_ROUTE);
  }, [nagivate]);

  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
