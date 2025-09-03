import { useEffect, useState } from "react";
import { useAuth } from '../context/authContext';
import { AiOutlineLoading } from "react-icons/ai";

const Udpinput = () => {
    const [inputVal, setInputVal] = useState('');
    const [isOk, setIsOK] = useState(null);
    const [isFail, setIsFail] = useState(null);
    const [isLoad, setIsLoad] = useState(false);
    const [userIdToken, setUserIdToken] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchToken = async () => {
            if (user) {
                try {
                    const token = await user.getIdToken();
                    setUserIdToken(token);
                } catch (error) {
                    console.error("Error fetching ID token:", error);
                }
            } else {
                setUserIdToken('');
            }
        };
        fetchToken();
    }, [user]);

    const sendUdpDATA = async (udpDATA) => {
        setInputVal('');
        if (!userIdToken) {
            alert("User token is not available. Cannot send data.");
            return;
        }
        setIsLoad(true);
        try {
            const response = await fetch(import.meta.env.VITE_CLIENT_PORT_PUSH || 'http://localhost:5000/push-udp-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userIdToken, udpDATA }),
            });

            if (response.ok) {
                setIsOK(true);
                setIsFail(false);
            } else {
                console.error("Failed to send UDP data:", response.status);
                setIsOK(false);
                setIsFail(true);
            }
        } catch (error) {
            console.error("Network error while sending UDP data:", error);
            setIsOK(false);
            setIsFail(true);
        } finally {
            setIsLoad(false);
        }

        setTimeout(() => {
            setIsFail(null);
            setIsOK(null);
        }, 2000)
    };

    return (
        <>
            <div className="bg-neutral-900 flex items-center justify-evenly p-2 rounded-b-2xl">
                <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="UDP Data.."
                    className="placeholder:text-neutral-400 border border-neutral-600 rounded-[4px] m-2 p-2 outline-none focus:border-neutral-500 font-bold w-[390px]"
                />
                <button
                    className="bg-neutral-900 border border-neutral-600 rounded-[4px] px-4 py-2 font-bold cursor-pointer active:bg-neutral-800 hover:border-neutral-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => {
                        if (inputVal) {
                            sendUdpDATA(inputVal);
                        }
                    
                    }}
                    disabled={!userIdToken}
                >
                    {isLoad ? <AiOutlineLoading size={24} className="animate-spin" /> : "Push"}
                </button>
            </div>
            {isOk && <p className="text-green-500 text-center font-bold">Data sent successfully!</p>}
            {isFail && <p className="text-red-500 text-center font-bold">Failed to send data.</p>}
        </>
    );
};

export default Udpinput;