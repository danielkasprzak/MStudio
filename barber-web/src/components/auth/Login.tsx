import { useGoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';
import useDocumentTitle from "../../hooks/useDocumentTitle";
import axiosInstance from '../../utils/axiosInstance';

import Button from './Button';
import Spacer from './Spacer';

export default () => {
    useDocumentTitle("MStudio - logowanie");
    const navigate = useNavigate();

    const googleLogin = useGoogleLogin({
        onSuccess: async ({ code }) => {
            const tokens = await axiosInstance.post('https://localhost:7190/auth/google', { code });
            if (tokens) {
                navigate('/rezerwacja');
            }
        },
        onError: errorResponse => console.log(errorResponse),
        flow: 'auth-code'
    });

    return (
        <div className='w-screen h-screen bg-stone-100 flex justify-center items-center'>
            <div className='p-16 bg-white border border-stone-300 text-charcoal flex flex-col justify-center items-center'>
                <h1 className="font-cormorant text-xl font-medium uppercase pb-8">MSTUDIO</h1>

                    <div className='flex justify-center items-center flex-col'>
                        <Button onClick={() => googleLogin()}>Rezerwacja z Google</Button>
                        <Spacer>lub</Spacer>
                        <Link to='/rezerwacja-tradycyjna'>
                            <Button>Rezerwacja tradycyjna</Button>
                        </Link>
                    </div>
            </div>
        </div>
    )
}