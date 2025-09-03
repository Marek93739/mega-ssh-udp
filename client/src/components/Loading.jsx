import { AiOutlineLoading } from "react-icons/ai";

const Loading = () => {
    return (
        <div className="fixed top-0 right-0 w-full h-dvh flex items-center justify-center gap-4">
            <AiOutlineLoading className="animate-spin" size={'30px'}/>
            <span className="text-[18px] font-bold">Loading ...</span>
        </div>
    );
};

export default Loading;