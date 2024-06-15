import useAuth from "../Hooks/useAuth";
import { FiMenu } from "react-icons/fi";

const DashboardNav = ({navToggle,setNavToggle}) => {
    const {user,handleLogOut} = useAuth();
    return (
        <div className="pr-10 border-b py-2">
            <div className='flex justify-between lg:justify-end items-center'>
                    <div className="text-2xl m-2 lg:hidden cursor-pointer" onClick={()=>setNavToggle(!navToggle)}>
                        <FiMenu />
                    </div>
                <div className="flex gap-2">
                    <img className="h-10 w-10 rounded-full border-2 border-[#008080]" src={user.photoURL} alt="" />                   
                    <button onClick={()=>handleLogOut()} className="bg-[#008080] px-3 rounded-md text-white font-semibold">Log out</button>
                </div>
                
            </div>
        </div>
    );
};

export default DashboardNav;