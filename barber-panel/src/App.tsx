import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/auth/Login';
import Reservation from './components/reservation/Reservation';
import MyReservations from './components/reservation/MyReservations';
import Offers from './components/reservation/Offers';
import Landing from './components/landing/Landing';

const router = createBrowserRouter([
  { path: '/', element: <Landing />},
  { path: '/rezerwacja', element: <Reservation />,
    children: [
      { path: '', element: <Offers /> },
      { path: 'moje-rezerwacje', element: <MyReservations /> }
    ]
  },
  { path: '/login', element: <Login /> }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App
