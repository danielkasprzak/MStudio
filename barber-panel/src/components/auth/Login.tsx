import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

import Button from './Button';
import Title from './ResTitle';
import Spacer from './Spacer';

export default () => {
    const googleLogin = useGoogleLogin({
        onSuccess: async ({ code }) => {
            const tokens = await axios.post('https://localhost:7190/auth/google', { code });
            if (tokens) {
                window.location.href = '/rezerwacja';
            }
        },
        onError: errorResponse => console.log(errorResponse),
        flow: 'auth-code'
    });


    return (
        <div className='flex justify-center items-center bg-dark-background w-screen h-screen'>
            <div className='w-[34rem] h-[40rem] bg-dark-foreground rounded-2xl'>
                    <Title/>

                    <div className='flex justify-center items-center flex-col'>
                        <Button onClick={() => googleLogin()}>Rezerwacja z Google</Button>
                        <Spacer>lub</Spacer>
                        {/* <Button>Rezerwacja tradycyjna</Button> */}
                    </div>
            </div>
        </div>
    )
}