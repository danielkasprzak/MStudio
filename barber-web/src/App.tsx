import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/http';
import { lazy } from 'react';

import { protectedLoader, adminLoader } from './utils/http';
import MyReservations, { loader as myReservationsLoader } from './components/reservation/MyReservations';
import Offers, { loader as offersLoader } from './components/reservation/Offers';
import OffersManage, { loader as offersManageLoader } from './components/admin/offers/Offers';
import OfferEdit, { loader as offersEditLoader, action as offersEditAction } from './components/admin/offers/OfferEdit';
import OfferNew, { action as offersNewAction } from './components/admin/offers/OfferNew';
import OpeningHours, { loader as openingHoursLoader } from './components/admin/opening-hours/OpeningHours';
import OpeningHoursEdit, { loader as openingHoursEditLoader, action as openingHoursEditAction } from './components/admin/opening-hours/OpeningHoursEdit';
import SpecialOpeningHours, { loader as specialOpeningHoursLoader } from './components/admin/special-opening-hours/SpecialOpeningHours';
import SpecialOpeningHourNew, { action as specialOpeningHourNewAction } from './components/admin/special-opening-hours/SpecialOpeningHourNew';
import SpecialOpeningHourEdit, { loader as specialOpeningHourEditLoader, action as specialOpeningHourEditAction } from './components/admin/special-opening-hours/SpecialOpeningHourEdit';
import Booking, { loader as bookingLoader } from './components/reservation/booking/Booking';
import Reservations, { loader as reservationsLoader } from './components/admin/reservations/Reservations';
import ReservationNew, { action as reservationNewAction } from './components/admin/reservations/ReservationNew';

const Landing = lazy(() => import('./components/landing/Landing'));
const Login = lazy(() => import('./components/auth/Login'));
const Admin = lazy(() => import('./components/admin/Admin'));
const Reservation = lazy(() => import('./components/reservation/Reservation'));
const ThankYouPage = lazy(() => import('./components/reservation/booking/ThankYouPage'));
const Error = lazy(() => import('./components/Error'));

const router = createBrowserRouter([
  { index: true, element: <Landing />, errorElement: <Error /> },
  { path: 'login', element: <Login />, errorElement: <Error /> },
  { path: 'rezerwacja', element: <Reservation />, errorElement: <Error />, loader: protectedLoader,
    children: [
      { index: true, element: <Offers />, loader: offersLoader },
      { path: 'moje-rezerwacje', element: <MyReservations />, loader: myReservationsLoader }
    ]
  },
  { path: 'rezerwuj', element: <Booking />, loader: bookingLoader },
  { path: 'dziekujemy', element: <ThankYouPage />},
  { path: 'admin', element: <Admin />, errorElement: <Error />, loader: adminLoader,
    children: [
      { path: 'rezerwacje', element: <Reservations />, loader: reservationsLoader,
        children: [
          { path: 'dodaj', element: <ReservationNew />, action: reservationNewAction },
        ]
      },
      { path: 'oferty', element: <OffersManage />,
        loader: offersManageLoader,
        children: [
          { path: 'dodaj', element: <OfferNew />, action: offersNewAction },
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
          { path: ':date', element: <SpecialOpeningHourEdit />, loader: specialOpeningHourEditLoader, action: specialOpeningHourEditAction }
        ]
      }
    ]
  }
]);

function App() {
  return <QueryClientProvider client={queryClient}><RouterProvider router={router} /></QueryClientProvider>;
}

export default App
