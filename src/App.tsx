import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import { DEFAULT_ROUTE } from './lib/constants';
import PetSearchPage from './pages/PetSearchPage';
import PetCreatePage from './pages/PetCreatePage';
import PetDetailPage from './pages/PetDetailPage';

function Root() {
  return <Layout />;
}

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <Root />,
      children: [
        {
          path: 'pet/search',
          element: <PetSearchPage />,
        },
        {
          path: 'pet/:id/view',
          element: <PetDetailPage />,
        },
        {
          path: 'pet/:id/edit',
          element: <PetDetailPage />,
        },
        {
          path: 'pet/create',
          element: <PetCreatePage />,
        },
        {
          path: '*',
          element: <Navigate to={DEFAULT_ROUTE} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
