import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import useDocumentTitle from "../../hooks/useDocumentTitle";

import Button from './Button';
import Spacer from './Spacer';
import axiosInstance from '../../util/axiosInstance';

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

    const traditionalLogin = () => { };

    return (
        <div className='w-screen h-screen bg-stone-100 flex justify-center items-center'>
            <div className='p-16 bg-white border border-stone-300 text-charcoal flex flex-col justify-center items-center'>
                <h1 className="font-cormorant text-xl font-medium uppercase pb-8">MSTUDIO</h1>

                    <div className='flex justify-center items-center flex-col'>
                        <Button onClick={() => googleLogin()}>Rezerwacja z Google</Button>
                        <Spacer>lub</Spacer>
                        <Button onClick={traditionalLogin}>Rezerwacja tradycyjna</Button>
                    </div>
            </div>
        </div>
    )
}