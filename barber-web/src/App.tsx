import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/http';
import { lazy } from 'react';

import { protectedLoader, adminLoader } from './utils/http';
import MyReservations, { loader as myReservationsLoader } from './components/reservation/my-reservations/MyReservations';
import Offers, { loader as offersLoader } from './components/reservation/offers/Offers';
import OffersManage, { loader as offersManageLoader } from './components/admin/offers/Offers';
import OfferEdit, { loader as offersEditLoader, action as offersEditAction } from './components/admin/offers/OfferEdit';
import OfferNew, { action as offersNewAction } from './components/admin/offers/OfferNew';
import OpeningHours, { loader as openingHoursLoader } from './components/admin/opening-hours/OpeningHours';
import OpeningHoursEdit, { loader as openingHoursEditLoader, action as openingHoursEditAction } from './components/admin/opening-hours/OpeningHoursEdit';
import SpecialOpeningHours, { loader as specialOpeningHoursLoader } from './components/admin/special-opening-hours/SpecialOpeningHours';
import SpecialOpeningHourNew, { action as specialOpeningHourNewAction } from './components/admin/special-opening-hours/SpecialOpeningHourNew';
import SpecialOpeningHourEdit, { loader as specialOpeningHourEditLoader, action as specialOpeningHourEditAction } from './components/admin/special-opening-hours/SpecialOpeningHourEdit';
import { loader as bookingLoader } from './components/reservation/booking/Booking';
import Reservations, { loader as reservationsLoader } from './components/admin/reservations/Reservations';
import ReservationNew, { action as reservationNewAction } from './components/admin/reservations/ReservationNew';
import { loader as traditionalReservationLoader } from './components/reservation/Traditional';
import { TransitionedReservation, TransitionedLogin, TransitionedAdmin, TransitionedThankYouPage, TransitionedBooking, TransitionedTraditional } from './components/Lazy';
import Dashboard from './components/admin/dashboard/Dashboard';

const Error = lazy(() => import('./components/Error'));
const Landing = lazy(() => import('./components/landing/Landing'));

const router = createBrowserRouter([
  { index: true, element: <Landing />, errorElement: <Error /> },
  { path: 'login', element: <TransitionedLogin />, errorElement: <Error /> },
  { path: 'rezerwacja-tradycyjna', element: <TransitionedTraditional />, errorElement: <Error />, loader: traditionalReservationLoader },
  { path: 'rezerwacja', element: <TransitionedReservation />, errorElement: <Error />, loader: protectedLoader,
    children: [
      { index: true, element: <Offers />, loader: offersLoader },
      { path: 'moje-rezerwacje', element: <MyReservations />, loader: myReservationsLoader }
    ]
  },
  { path: 'rezerwuj', element: <TransitionedBooking />, errorElement: <Error />, loader: bookingLoader },
  { path: 'dziekujemy', element: <TransitionedThankYouPage />, errorElement: <Error /> },
  { path: 'admin', element: <TransitionedAdmin />, errorElement: <Error />, loader: adminLoader,
    children: [
      { index: true, element: <Dashboard /> },
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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App
