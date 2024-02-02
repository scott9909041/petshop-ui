import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import { DEFAULT_ROUTE } from './lib/constants';
import PetSearchPage from './features/pet/PetSearchPage';
import PetCreatePage from './features/pet/PetCreatePage';
import PetDetailPage from './features/pet/PetDetailPage';
import PetListPage from './features/pet/PetListPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PetEditPage from './features/pet/PetEditPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout />
    </QueryClientProvider>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <Root />,
      children: [
        {
          path: 'pet',
          children: [
            {
              path: 'search',
              element: <PetSearchPage />,
            },
            {
              path: 'list',
              element: <PetListPage />,
            },
            {
              path: ':id/view',
              element: <PetDetailPage />,
            },
            {
              path: ':id/edit',
              element: <PetEditPage />,
            },
            {
              path: 'create',
              element: <PetCreatePage />,
            },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to={DEFAULT_ROUTE} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
