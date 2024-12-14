import Login from './components/auth/Login';
import Reservation from './components/reservation/Reservation';

function App() {
  return (
    // <div className='flex justify-center items-center bg-dark-background w-screen h-screen'>
    //   <Login />
    // </div>

    <div className='bg-dark-background w-full h-full flex flex-row justify-center'>
      <Reservation />
    </div>
  )
}

export default App
