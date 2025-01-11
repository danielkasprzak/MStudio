import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../util/http';

import Error from './components/Error';
import { protectedLoader, adminLoader } from '../util/http';
import Login from './components/auth/Login';
import Reservation from './components/reservation/Reservation';
import MyReservations from './components/reservation/MyReservations';
import Offers from './components/reservation/Offers';
import Landing from './components/landing/Landing';
import Admin from './components/admin/Admin';
import OffersManage, { loader as offersManageLoader } from './components/admin/offers/Offers';
import OfferEdit, { loader as offersEditLoader, action as offersEditAction } from './components/admin/offers/OfferEdit';
import OfferNew, { action as offersNewAction } from './components/admin/offers/OfferNew';

const router = createBrowserRouter([
  { index: true, element: <Landing />, errorElement: <Error /> },
  { path: 'rezerwacja', element: <Reservation />, loader: protectedLoader,
    children: [
      { index: true, element: <Offers /> },
      { path: 'moje-rezerwacje', element: <MyReservations /> }
    ]
  },
  { path: 'login', element: <Login /> },
  { path: 'admin', element: <Admin />, errorElement: <Error />, loader: adminLoader,
    children: [
      { path: 'oferty', element: <OffersManage />,
        loader: offersManageLoader,
        children: [
          { path: 'nowa', element: <OfferNew />, action: offersNewAction },
          { path: ':id', element: <OfferEdit />, loader: offersEditLoader, action: offersEditAction }
        ]
      }
    ]
  }
]);

function App() {
  return <QueryClientProvider client={queryClient}><RouterProvider router={router} /></QueryClientProvider>;
}

export default App
