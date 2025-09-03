import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineInfoCircle } from 'react-icons/ai';

export default function Navbar(){
    
    return (
        <nav className="w-full bg-black px-4 py-2 flex items-center justify-between border-b border-neutral-500">
            <span className='text-orange-400 text-2xl font-bold'>Mega UDP</span>
            <div className='flex items-center gap-4 font-bold'>
                <Link to={'/'} className='px-4 py-1 rounded-[4px] hover:bg-neutral-700 transition-all flex items-center gap-2 border-b-1 border-orange-700 hover:border-transparent'>
                    <AiOutlineHome size={18} />
                    <span>Home</span>
                </Link>
                <Link to={'/about'} className='px-4 py-1 rounded-[4px] hover:bg-neutral-700 transition-all flex items-center gap-2 border-b-1 border-orange-700 hover:border-transparent'>
                    <AiOutlineInfoCircle size={18} />
                    <span>About</span>
                </Link>
            </div>
        </nav>
    );
};