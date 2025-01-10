import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import Login from './components/auth/Login';
import Reservation from './components/reservation/Reservation';
import MyReservations from './components/reservation/MyReservations';
import Offers from './components/reservation/Offers';
import Landing from './components/landing/Landing';
import Admin from './components/admin/Admin';
import OffersManage from './components/admin/offers/Offers';

const router = createBrowserRouter([
  { path: '/', element: <Landing />},
  { path: '/rezerwacja', element: <Reservation />,
    children: [
      { path: '', element: <Offers /> },
      { path: 'moje-rezerwacje', element: <MyReservations /> }
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/admin', element: <Admin />,
    children: [
      { path: '', element: <OffersManage />}
    ]
  }
]);

const queryClient = new QueryClient();

function App() {
  return <QueryClientProvider client={queryClient}><RouterProvider router={router} /></QueryClientProvider>;
}

export default App
