import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/http';

import LoadingIndicator from './components/LoadingIndicator';

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
const ReservationEdit = lazy(() => import('./components/admin/reservations/ReservationEdit'));
const Dashboard = lazy(() => import('./components/admin/dashboard/Dashboard'));

const router = createBrowserRouter([
  { index: true, element: <Suspense fallback={<LoadingIndicator/>}><Landing /></Suspense>, errorElement: <Error /> },
  { path: 'login', element: <Suspense fallback={<LoadingIndicator/>}><Login /></Suspense>, errorElement: <Error /> },
  { path: 'rezerwacja-tradycyjna', element: <Suspense fallback={<LoadingIndicator/>}><Traditional /></Suspense>, errorElement: <Error />, loader: () => import('./components/reservation/Traditional').then(module => module.loader()) },
  { path: 'rezerwacja', element: <Suspense fallback={<LoadingIndicator/>}><Reservation /></Suspense>, errorElement: <Error />, loader: () => import('./components/reservation/Reservation').then(module => module.loader()),
    children: [
      { index: true, element: <Suspense fallback={<LoadingIndicator/>}><Offers /></Suspense>, loader: () => import('./components/reservation/offers/Offers').then(module => module.loader()) },
      { path: 'moje-rezerwacje', element: <Suspense fallback={<LoadingIndicator/>}><MyReservations /></Suspense>, loader: () => import('./components/reservation/my-reservations/MyReservations').then(module => module.loader()) }
    ]
  },
  { path: 'rezerwuj', element: <Suspense fallback={<LoadingIndicator/>}><Booking /></Suspense>, errorElement: <Error />, loader: () => import('./components/reservation/booking/Booking').then(module => module.loader()) },
  { path: 'dziekujemy', element: <Suspense fallback={<LoadingIndicator/>}><ThankYouPage /></Suspense>, errorElement: <Error /> },
  { path: 'admin', element: <Suspense fallback={<LoadingIndicator/>}><Admin /></Suspense>, errorElement: <Error />, loader: () => import('./components/admin/Admin').then(module => module.loader()),
    children: [
      { index: true, element: <Suspense fallback={<LoadingIndicator/>}><Dashboard /></Suspense> },
      { path: 'rezerwacje', element: <Suspense fallback={<LoadingIndicator/>}><Reservations /></Suspense>, loader: () => import('./components/admin/reservations/Reservations').then(module => module.loader()),
        children: [
          { path: 'dodaj', element: <Suspense fallback={<LoadingIndicator/>}><ReservationNew /></Suspense>, action: (meta) => import('./components/admin/reservations/ReservationNew').then(module => module.action(meta)) },
          { path: ':id', element: <Suspense fallback={<LoadingIndicator/>}><ReservationEdit /></Suspense>, loader: (meta) => import('./components/admin/reservations/ReservationEdit').then(module => module.loader(meta)),
          action: (meta) => import('./components/admin/reservations/ReservationEdit').then(module => module.action(meta)) }
        ]
      },
      { path: 'oferty', element: <Suspense fallback={<LoadingIndicator/>}><OffersManage /></Suspense>,
        loader: () => import('./components/admin/offers/Offers').then(module => module.loader()),
        children: [
          { path: 'dodaj', element: <Suspense fallback={<LoadingIndicator/>}><OfferNew /></Suspense>, action: (meta) => import('./components/admin/offers/OfferNew').then(module => module.action(meta)) },
          { path: ':id', element: <Suspense fallback={<LoadingIndicator/>}><OfferEdit /></Suspense>, loader: (meta) => import('./components/admin/offers/OfferEdit').then(module => module.loader(meta)),
            action: (meta) => import('./components/admin/offers/OfferEdit').then(module => module.action(meta)) }
        ]
      },
      { path: 'godziny-otwarcia', element: <Suspense fallback={<LoadingIndicator/>}><OpeningHours /></Suspense>, loader: () => import('./components/admin/opening-hours/OpeningHours').then(module => module.loader()),
        children: [
          { path: ':day', element: <Suspense fallback={<LoadingIndicator/>}><OpeningHourEdit /></Suspense>, loader: (meta) => import('./components/admin/opening-hours/OpeningHourEdit').then(module => module.loader(meta)),
            action: (meta) => import('./components/admin/opening-hours/OpeningHourEdit').then(module => module.action(meta)) }
        ]
      },
      { path: 'specjalne-godziny-otwarcia', element: <Suspense fallback={<LoadingIndicator/>}><SpecialOpeningHours /></Suspense>, loader: () => import('./components/admin/special-opening-hours/SpecialOpeningHours').then(module => module.loader()),
        children: [
          { path: 'dodaj', element: <Suspense fallback={<LoadingIndicator/>}><SpecialOpeningHourNew /></Suspense>, action: (meta) => import('./components/admin/special-opening-hours/SpecialOpeningHourNew').then(module => module.action(meta)) },
          { path: ':date', element: <Suspense fallback={<LoadingIndicator/>}><SpecialOpeningHourEdit /></Suspense>, loader: (meta) => import('./components/admin/special-opening-hours/SpecialOpeningHourEdit').then(module => module.loader(meta)),
            action: (meta) => import('./components/admin/special-opening-hours/SpecialOpeningHourEdit').then(module => module.action(meta)) }
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
