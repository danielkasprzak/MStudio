import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/http';
import { lazy } from 'react';

import Error from './components/Error';
import { protectedLoader, adminLoader } from './utils/http';
import MyReservations from './components/reservation/MyReservations';
import Offers from './components/reservation/Offers';
import OffersManage, { loader as offersManageLoader } from './components/admin/offers/Offers';
import OfferEdit, { loader as offersEditLoader, action as offersEditAction } from './components/admin/offers/OfferEdit';
import OfferNew, { action as offersNewAction } from './components/admin/offers/OfferNew';
import OpeningHours, { loader as openingHoursLoader } from './components/admin/opening-hours/OpeningHours';
import OpeningHoursEdit, { loader as openingHoursEditLoader, action as openingHoursEditAction } from './components/admin/opening-hours/OpeningHoursEdit';
import SpecialOpeningHours, { loader as specialOpeningHoursLoader } from './components/admin/special-opening-hours/SpecialOpeningHours';
import SpecialOpeningHourNew, { action as specialOpeningHourNewAction } from './components/admin/special-opening-hours/SpecialOpeningHourNew';
import SpecialOpeningHourEdit, { loader as specialOpeningHourEditLoader } from './components/admin/special-opening-hours/SpecialOpeningHourEdit';

const Landing = lazy(() => import('./components/landing/Landing'));
const Login = lazy(() => import('./components/auth/Login'));
const Admin = lazy(() => import('./components/admin/Admin'));
const Reservation = lazy(() => import('./components/reservation/Reservation'));

const router = createBrowserRouter([
  { index: true, element: <Landing />, errorElement: <Error /> },
  { path: 'rezerwacja', element: <Reservation />, errorElement: <Error />, loader: protectedLoader,
    children: [
      { index: true, element: <Offers /> },
      { path: 'moje-rezerwacje', element: <MyReservations /> }
    ]
  },
  { path: 'login', element: <Login />, errorElement: <Error /> },
  { path: 'admin', element: <Admin />, errorElement: <Error />, loader: adminLoader,
    children: [
      { path: 'oferty', element: <OffersManage />,
        loader: offersManageLoader,
        children: [
          { path: 'nowa', element: <OfferNew />, action: offersNewAction },
          { path: ':id', element: <OfferEdit />, loader: offersEditLoader, action: offersEditAction }
        ]
      },
      { path: 'godziny-otwarcia', element: <OpeningHours />, loader: openingHoursLoader,
        children: [
          { path: ':day', element: <OpeningHoursEdit />, loader: openingHoursEditLoader, action: openingHoursEditAction }
        ]
      },
      { path: 'specjalne-godziny-otwarcia', element: <SpecialOpeningHours />, loader: specialOpeningHoursLoader,
        children: [
          { path: 'dodaj', element: <SpecialOpeningHourNew />, action: specialOpeningHourNewAction },
          { path: ':date', element: <SpecialOpeningHourEdit />, loader: specialOpeningHourEditLoader }
        ]
      }
    ]
  }
]);

function App() {
  return <QueryClientProvider client={queryClient}><RouterProvider router={router} /></QueryClientProvider>;
}

export default App
