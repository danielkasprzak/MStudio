import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/http';
import Label from './components/Label';

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

const router = createBrowserRouter([
  { index: true, element: <Suspense fallback={<Label>Wczytywanie...</Label>}><Landing /></Suspense>, errorElement: <Error /> },
  { path: 'login', element: <Suspense fallback={<Label>Wczytywanie...</Label>}><Login /></Suspense>, errorElement: <Error /> },
  { path: 'rezerwacja-tradycyjna', element: <Suspense fallback={<Label>Wczytywanie...</Label>}><Traditional /></Suspense>, errorElement: <Error />, loader: () => import('./components/reservation/Traditional').then(module => module.loader()) },
  { path: 'rezerwacja', element: <Suspense fallback={<Label>Wczytywanie...</Label>}><Reservation /></Suspense>, errorElement: <Error />, loader: () => import('./components/reservation/Reservation').then(module => module.loader()),
    children: [
      { index: true, element: <Suspense fallback={<Label>Wczytywanie...</Label>}><Offers /></Suspense>, loader: () => import('./components/reservation/offers/Offers').then(module => module.loader()) },
      { path: 'moje-rezerwacje', element: <Suspense fallback={<Label>Wczytywanie...</Label>}><MyReservations /></Suspense>, loader: () => import('./components/reservation/my-reservations/MyReservations').then(module => module.loader()) }
    ]
  },
  { path: 'rezerwuj', element: <Suspense fallback={<Label>Wczytywanie...</Label>}><Booking /></Suspense>, errorElement: <Error />, loader: () => import('./components/reservation/booking/Booking').then(module => module.loader()) },
  { path: 'dziekujemy', element: <Suspense fallback={<Label>Wczytywanie...</Label>}><ThankYouPage /></Suspense>, errorElement: <Error /> },
  { path: 'admin', element: <Suspense fallback={<Label>Wczytywanie...</Label>}><Admin /></Suspense>, errorElement: <Error />, loader: () => import('./components/admin/Admin').then(module => module.loader()),
    children: [
      { index: true, element: <Suspense fallback={<Label>Wczytywanie...</Label>}><Dashboard /></Suspense> },
      { path: 'rezerwacje', element: <Suspense fallback={<Label>Wczytywanie...</Label>}><Reservations /></Suspense>, loader: () => import('./components/admin/reservations/Reservations').then(module => module.loader()),
        children: [
          { path: 'dodaj', element: <Suspense fallback={<Label>Wczytywanie...</Label>}><ReservationNew /></Suspense>, action: (meta) => import('./components/admin/reservations/ReservationNew').then(module => module.action(meta)) },
        ]
      },
      { path: 'oferty', element: <Suspense fallback={<Label>Wczytywanie...</Label>}><OffersManage /></Suspense>,
        loader: () => import('./components/admin/offers/Offers').then(module => module.loader()),
        children: [
          { path: 'dodaj', element: <Suspense fallback={<Label>Wczytywanie...</Label>}><OfferNew /></Suspense>, action: (meta) => import('./components/admin/offers/OfferNew').then(module => module.action(meta)) },
          { path: ':id', element: <Suspense fallback={<Label>Wczytywanie...</Label>}><OfferEdit /></Suspense>, loader: (meta) => import('./components/admin/offers/OfferEdit').then(module => module.loader(meta)),
            action: (meta) => import('./components/admin/offers/OfferEdit').then(module => module.action(meta)) }
        ]
      },
      { path: 'godziny-otwarcia', element: <Suspense fallback={<Label>Wczytywanie...</Label>}><OpeningHours /></Suspense>, loader: () => import('./components/admin/opening-hours/OpeningHours').then(module => module.loader()),
        children: [
          { path: ':day', element: <Suspense fallback={<Label>Wczytywanie...</Label>}><OpeningHourEdit /></Suspense>, loader: (meta) => import('./components/admin/opening-hours/OpeningHourEdit').then(module => module.loader(meta)),
            action: (meta) => import('./components/admin/opening-hours/OpeningHourEdit').then(module => module.action(meta)) }
        ]
      },
      { path: 'specjalne-godziny-otwarcia', element: <Suspense fallback={<Label>Wczytywanie...</Label>}><SpecialOpeningHours /></Suspense>, loader: () => import('./components/admin/special-opening-hours/SpecialOpeningHours').then(module => module.loader()),
        children: [
          { path: 'dodaj', element: <Suspense fallback={<Label>Wczytywanie...</Label>}><SpecialOpeningHourNew /></Suspense>, action: (meta) => import('./components/admin/special-opening-hours/SpecialOpeningHourNew').then(module => module.action(meta)) },
          { path: ':date', element: <Suspense fallback={<Label>Wczytywanie...</Label>}><SpecialOpeningHourEdit /></Suspense>, loader: (meta) => import('./components/admin/special-opening-hours/SpecialOpeningHourEdit').then(module => module.loader(meta)),
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
