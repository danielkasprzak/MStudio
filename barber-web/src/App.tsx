import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/http';

const Error = lazy(() => import('./components/Error'));
const Landing = lazy(() => import('./components/landing/Landing'));
const Traditional = lazy(() => import('./components/reservation/Traditional'));
const Reservation = lazy(() => import('./components/reservation/Reservation'));
const Login = lazy(() => import('./components/auth/Login'));
const Admin = lazy(() => import('./components/admin/Admin'));
const ThankYouPage = lazy(() => import('./components/reservation/booking/ThankYouPage'));
const Booking = lazy(() => import('./components/reservation/booking/Booking'));
const MyReservations = lazy(() => import('./components/reservation/my-reservations/MyReservations'));
const Offers = lazy(() => import('./components/reservation/offers/Offers'));
const OffersManage = lazy(() => import('./components/admin/offers/Offers'));
const OfferEdit = lazy(() => import('./components/admin/offers/OfferEdit'));
const OfferNew = lazy(() => import('./components/admin/offers/OfferNew'));
const OpeningHours = lazy(() => import('./components/admin/opening-hours/OpeningHours'));
const OpeningHourEdit = lazy(() => import('./components/admin/opening-hours/OpeningHourEdit'));
const SpecialOpeningHours = lazy(() => import('./components/admin/special-opening-hours/SpecialOpeningHours'));
const SpecialOpeningHourNew = lazy(() => import('./components/admin/special-opening-hours/SpecialOpeningHourNew'));
const SpecialOpeningHourEdit = lazy(() => import('./components/admin/special-opening-hours/SpecialOpeningHourEdit'));
const Reservations = lazy(() => import('./components/admin/reservations/Reservations'));
const ReservationNew = lazy(() => import('./components/admin/reservations/ReservationNew'));
const Dashboard = lazy(() => import('./components/admin/dashboard/Dashboard'));

// import { TransitionedReservation, TransitionedLogin, TransitionedAdmin, TransitionedThankYouPage, TransitionedBooking, TransitionedTraditional } from './components/Lazy';

const router = createBrowserRouter([
  { index: true, element: <Landing />, errorElement: <Error /> },
  { path: 'login', element: <Login />, errorElement: <Error /> },
  { path: 'rezerwacja-tradycyjna', element: <Traditional />, errorElement: <Error />, loader: () => import('./components/reservation/Traditional').then(module => module.loader()) },
  { path: 'rezerwacja', element: <Reservation />, errorElement: <Error />, loader: () => import('./components/reservation/Reservation').then(module => module.loader()),
    children: [
      { index: true, element: <Offers />, loader: () => import('./components/reservation/offers/Offers').then(module => module.loader()) },
      { path: 'moje-rezerwacje', element: <MyReservations />, loader: () => import('./components/reservation/my-reservations/MyReservations').then(module => module.loader()) }
    ]
  },
  { path: 'rezerwuj', element: <Booking />, errorElement: <Error />, loader: () => import('./components/reservation/booking/Booking').then(module => module.loader()) },
  { path: 'dziekujemy', element: <ThankYouPage />, errorElement: <Error /> },
  { path: 'admin', element: <Admin />, errorElement: <Error />, loader: () => import('./components/admin/Admin').then(module => module.loader()),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'rezerwacje', element: <Reservations />, loader: () => import('./components/admin/reservations/Reservations').then(module => module.loader()),
        children: [
          { path: 'dodaj', element: <ReservationNew />, action: () => import('./components/admin/reservations/ReservationNew').then(module => module.action) },
        ]
      },
      { path: 'oferty', element: <OffersManage />,
        loader: () => import('./components/admin/offers/Offers').then(module => module.loader()),
        children: [
          { path: 'dodaj', element: <OfferNew />, action: () => import('./components/admin/offers/OfferNew').then(module => module.action) },
          { path: ':id', element: <OfferEdit />, loader: (meta) => import('./components/admin/offers/OfferEdit').then(module => module.loader(meta)),
            action: () => import('./components/admin/offers/OfferEdit').then(module => module.action) }
        ]
      },
      { path: 'godziny-otwarcia', element: <OpeningHours />, loader: () => import('./components/admin/opening-hours/OpeningHours').then(module => module.loader()),
        children: [
          { path: ':day', element: <OpeningHourEdit />, loader: (meta) => import('./components/admin/opening-hours/OpeningHourEdit').then(module => module.loader(meta)),
            action: () => import('./components/admin/opening-hours/OpeningHourEdit').then(module => module.action) }
        ]
      },
      { path: 'specjalne-godziny-otwarcia', element: <SpecialOpeningHours />, loader: () => import('./components/admin/special-opening-hours/SpecialOpeningHours').then(module => module.loader()),
        children: [
          { path: 'dodaj', element: <SpecialOpeningHourNew />, action: () => import('./components/admin/special-opening-hours/SpecialOpeningHourNew').then(module => module.action) },
          { path: ':date', element: <SpecialOpeningHourEdit />, loader: (meta) => import('./components/admin/special-opening-hours/SpecialOpeningHourEdit').then(module => module.loader(meta)),
            action: () => import('./components/admin/special-opening-hours/SpecialOpeningHourEdit').then(module => module.action) }
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
