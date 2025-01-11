import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../util/http';

import Error from './components/Error';
import Login from './components/auth/Login';
import Reservation from './components/reservation/Reservation';
import MyReservations from './components/reservation/MyReservations';
import Offers from './components/reservation/Offers';
import Landing from './components/landing/Landing';
import Admin from './components/admin/Admin';
import OffersManage, { loader as offersManageLoader } from './components/admin/offers/Offers';

const router = createBrowserRouter([
  { index: true, element: <Landing />, errorElement: <Error /> },
  { path: '/rezerwacja', element: <Reservation />,
    children: [
      { index: true, element: <Offers /> },
      { path: 'moje-rezerwacje', element: <MyReservations /> }
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/admin', element: <Admin />,
    children: [
      { path: '/oferty', element: <OffersManage />,
        loader: offersManageLoader
      }
    ]
  }
]);

function App() {
  return <QueryClientProvider client={queryClient}><RouterProvider router={router} /></QueryClientProvider>;
}

export default App
