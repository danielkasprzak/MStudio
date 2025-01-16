import { lazy } from 'react';
import transition from './transition';

const Reservation = lazy(() => import('./reservation/Reservation'));
const Login = lazy(() => import('./auth/Login'));
const Admin = lazy(() => import('./admin/Admin'));
const ThankYouPage = lazy(() => import('./reservation/booking/ThankYouPage'));
const Booking = lazy(() => import('./reservation/booking/Booking'));
const Traditional = lazy(() => import('./reservation/Traditional'));

const LazyReservation = () => <Reservation />;
const LazyLogin = () => <Login />;
const LazyAdmin = () => <Admin />;
const LazyThankYouPage = () => <ThankYouPage />;
const LazyBooking = () => <Booking />;
const LazyTraditional = () => <Traditional />;

export const TransitionedReservation = transition(LazyReservation);
export const TransitionedLogin = transition(LazyLogin);
export const TransitionedAdmin = transition(LazyAdmin);
export const TransitionedThankYouPage = transition(LazyThankYouPage);
export const TransitionedBooking = transition(LazyBooking);
export const TransitionedTraditional = transition(LazyTraditional);