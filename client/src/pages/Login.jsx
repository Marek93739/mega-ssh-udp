
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineLoading } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import app from '../firebase/auth.config';
import Loading from '../components/Loading';
import { useAuth } from '../context/authContext';

export default function LoginPage() {

    const navigate = useNavigate();
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    const [isLoading, setIsLoading] = useState();
    const [isError, setIsError] = useState(false);
    const [errorContent, setErrorContent] = useState('');

    const {loading} = useAuth();
    const [isOnAuthLoading, setIsOnAuthLoading] = useState(loading);

    setTimeout(() => {
        setIsOnAuthLoading(loading)
    }, 2000);

    const handleGoogleLogin = async () => {
        setIsLoading(true)
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        if (user.emailVerified) {
            console.log('Successfully logged in:', user);
            navigate('/');
        } else {
            setIsLoading(false)
            setIsError(true)
            setErrorContent('There was an Error While trying to sign in With Your Google account.')
        }
    } catch (error) {
        setIsLoading(false)
        setIsError(true)
        setErrorContent(`Error during Google sign in, Check your internet connection and try agin ! :', ${error}`)
    }
};

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            {isOnAuthLoading ? <Loading/> : null}
            <div className={`bg-neutral-800 p-8 mx-2 rounded-lg w-full max-w-md ${isOnAuthLoading ? 'hidden' : null}`}>
                <h1 className="text-[22px] font-bold text-center mb-6 text-orange-400">Login To <span className='bg-amber-900 px-1 rounded-[4px]'>Mega UDP</span> With Your Google Account</h1>
                {isError ? <p className='text-red-500 text-center m-1'>{errorContent}</p> : null}
                <button
                    disabled={isLoading}
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center gap-3 bg-neutral-300 text-black p-2 m-auto rounded-lg hover:bg-gray-100 transition-all font-bold cursor-pointer"
                >
                    {isLoading ? <AiOutlineLoading className='animate-spin size-[24px]'/> : <FcGoogle size={24} />}
                    <span>Continue with Google</span>
                </button>
            </div>
        </div>
    );
}