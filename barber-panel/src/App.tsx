import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/auth/Login';
import Reservation from './components/reservation/Reservation';

const router = createBrowserRouter([
  { path: '/', element: <Reservation /> },
  { path: '/login', element: <Login /> }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App
