import { AiFillCopy, AiOutlineLoading } from "react-icons/ai";
import Navbar from "../components/Navbar";
import Udpinput from "../components/Udpinput";
import { useAuth } from '../context/authContext';
import { useEffect, useState } from "react";
import { toast, Toaster, ToastIcon } from 'react-hot-toast';


export default function HomePage() {

  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const checkAdminRole = async () => {
      if (user) {
        try {
          const userEmail = await user.email;
          setIsAdmin(userEmail === import.meta.env.VITE_ADMIN_EMAIL);          
        } catch (error) {
          toast.error(error)
        }
      } else {
        setIsAdmin(false);
      }
    };
    checkAdminRole();
  }, [user]);

  const [udpArrayDATA, setUdpArrayDA] = useState([]);
  const [isLoadingDATA, setIsLoadingDATA] = useState(true);

  setTimeout(() => {
    setIsLoadingDATA(false)
  }, 2000);

  useEffect(() => {
    const getUdpDATA = async () => {
      const userIdToken = await user.getIdToken();
      if (userIdToken){
        const response = await fetch(import.meta.env.VITE_CLIENT_PORT_GET || 'http://localhost:5000/get-udp-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({userIdToken})
        });
        if(response.ok){
          const allUdpDATA = await response.json();
          const finalUDPResultArray = Object.values(allUdpDATA);
          setUdpArrayDA(finalUDPResultArray);
        }
        else{
          console.log(response);
        }
      }
    }
    getUdpDATA();
  }, [user]);

  useEffect(() => {
    if(udpArrayDATA){
      console.log("Updated udpArrayDATA:", udpArrayDATA);
      console.log(udpArrayDATA);
      
    }
  }, [udpArrayDATA]);

  const handleCopy = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        toast.success('Copied to clipboard!');
      })
      .catch(err => {
        toast.error('Failed to copy!');
      });
  };

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="container mx-auto">
        {isAdmin ? <Udpinput /> : null}
        <h2 className="text-2xl font-bold text-gray-400 my-6 text-center">Your SSH UDP Credencial is Waiting For You, <span className="text-green-500">For Free</span> And Available <span className="text-orange-400">24/7</span></h2>
        <p className="text-orange-400 text-center font-bold mb-6">Just Copy And Start Using it, AnyTime And AnyWhere ! :</p>
        {udpArrayDATA[0] === null ? (
          <div className="bg-transparent p-2 flex items-center justify-center">
            {isLoadingDATA ? <AiOutlineLoading className="text-5xl text-amber-200 animate-spin"/> : <p className="text-center text-gray-600">No UDP data available.</p>}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            {udpArrayDATA.map((item, index) => (
              <div key={index} className={`shadow-lg rounded-lg p-1 px-3 border border-neutral-900 ${item ? 'h-[600px]' : null} overflow-auto`}>
                {item && Object.entries(item).map(([key, value]) => (
                  <div key={key} className="mb-4">
                    <div className="flex items-center justify-between bg-neutral-900 p-3 rounded-md mt-1">
                      <span className="text-white break-all mr-2 w-[250px]">{String(value)}</span>
                      <button
                        onClick={() => handleCopy(String(value))}
                        className="bg-orange-500 flex items-center gap-[1px] hover:bg-orange-600 text-white cursor-pointer font-bold py-2 px-6 rounded-md text-sm transition duration-300 ease-in-out"
                      >
                        <AiFillCopy/> <span>Copy</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
